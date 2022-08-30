import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { call, put, takeEvery } from "redux-saga/effects";
import { addToCartAction, clearCartAction, removeFromCartAction, setActiveCategoryAction, setCategoriesAction, setProductsAction } from "../actions/products.actions";
import App from "../App";
import { productReducer } from "../reducers/product.reducers";
import { watcherProductsSaga, workerRemoveFromCartSaga, workerAddToCartSaga, workerCheckoutSaga, workerCategoriesFetchSaga, workerProductsFetchSaga } from "../sagas/products.saga";
import {fetchAllCategories, fetchAllProducts} from "../services/products.service"
import { ProductsReducerActionsType, ProductStateType, ProductType, singleCategoryType } from "../types/products.types";
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);


describe("fetchAllProducts service", ()=>{
    it("must return products list for valid endpoint",()=>{
        const products = fetch("https://fakestoreapi.com/products").then(res=>res.json())
        expect(products).toEqual(fetchAllProducts());
    })

    it("must return error for invalid endpoint",async()=>{
        const products = fetch("https://fakestoreapi.com/product").then(res=>res.json()).catch(err=>err)
        expect(await fetchAllProducts()).not.toBe(products);
    })
})

describe("fetchAllCategories service", ()=>{
    it("must return products list for valid endpoint",()=>{
        const products = fetch("https://fakestoreapi.com/products/categories").then(res=>res.json())
        expect(products).toEqual(fetchAllCategories());
    })
})

describe("products reducer",()=>{
    let initialState:ProductStateType;
    //let products:ProductType[] = fetchAllProducts().then(data=>data as ProductType[])
    beforeEach(()=>{
        initialState = {
            activeCategory:"",
            allCategories:[],
            allProducts:[],
            activeProducts:[],
            cart:[]
        }
    })
    it("SET_PRODUCTS must set allProducts in reducer state",()=>{
        let payload:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let updatedState = {...initialState, allProducts: [...payload] }
        expect(productReducer(initialState,{type: "SET_PRODUCTS", payload})).toEqual(updatedState)
    })

    it("SET_CATEGORIES must set categories to reducer state",()=>{
        let payload:singleCategoryType[]=["men's clothing"]
        let updatedState = {...initialState, allCategories: [...payload] }
        expect(productReducer(initialState,{type: "SET_CATEGORIES", payload})).toEqual(updatedState)
    })

    it("SET_ACTIVE_CATEGORY must set active category to reducer state",()=>{
        let payload:singleCategoryType="men's clothing"
        let updatedState = {...initialState, activeCategory: payload }
        expect(productReducer(initialState,{type: "SET_ACTIVE_CATEGORY", payload})).toEqual(updatedState)
    })

    it("ADD_TO_CART must add product to cart if a valid payload is sent",()=>{
        let newProd:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let state:ProductStateType={
            activeCategory:"",
            allCategories:[],
            allProducts:[...newProd],
            activeProducts:[],
            cart:[]
        }
        let payload:number=1
        let updatedState = {...state, cart:[...state.cart,...newProd] }
        expect(productReducer(state,{type: "ADD_TO_CART", payload})).toEqual(updatedState)
    })

    it("ADD_TO_CART must return original state if payload is invalid product id",()=>{
        let newProd:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let state:ProductStateType={
            activeCategory:"",
            allCategories:[],
            allProducts:[...newProd],
            activeProducts:[],
            cart:[]
        }
        let payload:number=3
        let updatedState = {...state }
        expect(productReducer(state,{type: "ADD_TO_CART", payload})).toEqual(updatedState)
    })

    it("SET_CART must add all products to the cart of reducer state",()=>{
        let payload:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let updatedState = {...initialState, cart: [...payload] }
        expect(productReducer(initialState,{type: "SET_CART", payload})).toEqual(updatedState)
    })

    it("REMOVE_FROM_CART must remove payload product from reducer cart if it exists in the cart",()=>{
        let payload:number =1;
        let newProd:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let state:ProductStateType={
            activeCategory:"",
            allCategories:[],
            allProducts:[...newProd],
            activeProducts:[],
            cart:[...newProd]
        }
        let updatedState = {...state, cart: [] }
        expect(productReducer(state,{type: "REMOVE_FROM_CART", payload})).toEqual(updatedState)
    })

    it("REMOVE_FROM_CART must return original state if product is not in the cart",()=>{
        let payload:number =3;
        let newProd:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let state:ProductStateType={
            activeCategory:"",
            allCategories:[],
            allProducts:[...newProd],
            activeProducts:[],
            cart:[...newProd]
        }
        let updatedState = {...state, cart: [...newProd] }
        expect(productReducer(state,{type: "REMOVE_FROM_CART", payload})).toEqual(updatedState)
    })

    it("CLEAR_CART must empty the cart",()=>{
        let newProd:ProductType[]=[{
            id :1,
            title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price:109.95,
            description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category:"men's clothing",
            image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating:{"rate":3.9,"count":120}
        }]
        let state:ProductStateType={
            activeCategory:"",
            allCategories:[],
            allProducts:[...newProd],
            activeProducts:[],
            cart:[...newProd]
        }
        let updatedState = {...state, cart: [] }
        expect(productReducer(state,{type: "CLEAR_CART"})).toEqual(updatedState)
    })
})

describe("products watcher saga",()=>{
    let watcherItr=watcherProductsSaga();
    beforeAll(()=>{
        watcherItr = watcherProductsSaga();
    })

    it("must call worker saga after FETCH_PRODUCTS action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(ProductsReducerActionsType.FETCH_PRODUCTS, workerProductsFetchSaga))
    })

    it("must call worker saga after FETCH_CATEGORIES action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(ProductsReducerActionsType.FETCH_CATEGORIES, workerCategoriesFetchSaga))
    })

    it("must call worker saga after ADD_TO_CART_A action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(ProductsReducerActionsType.ADD_TO_CART_A, workerAddToCartSaga))
    })

    it("must call worker saga after REMOVE_FROM_CART_A action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(ProductsReducerActionsType.REMOVE_FROM_CART_A, workerRemoveFromCartSaga))
    })

    it("must call worker saga after CHECKOUT action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(ProductsReducerActionsType.CHECKOUT, workerCheckoutSaga))
    })
})

describe("fetch products worker saga",()=>{
    it("must put products to reducer after fetch", ()=>{
        let workerItr = workerProductsFetchSaga({type: "FETCH_PRODUCTS"})
        let fetchProductsResponse = workerItr.next().value
        expect(fetchProductsResponse).toEqual(call(fetchAllProducts)) 
        // expect(callLoginResponse).toEqual(call(login, action.payload)) 
            let res:ProductType[]=[{
                    id :1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price:109.95,
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    category:"men's clothing",
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    rating:{"rate":3.9,"count":120}
                }]
        expect(put(setProductsAction(res))).toEqual(workerItr.next(res).value)
            expect(workerItr.next().done).toBeTruthy()
    })
})

describe("fetch categories worker saga",()=>{
    it("must put categories to reducer after fetch", ()=>{
        let workerItr = workerCategoriesFetchSaga({type: "FETCH_CATEGORIES"})
        let fetchCategoriesResponse = workerItr.next().value
        expect(fetchCategoriesResponse).toEqual(call(fetchAllCategories)) 
        let res:singleCategoryType[]=["men's clothing", "jewelery"]
        expect(put(setCategoriesAction(res))).toEqual(workerItr.next(res).value)
        expect(workerItr.next().done).toBeTruthy()
    })
})

describe("add to cart worker saga",()=>{
    it("must put products to reducer cart", ()=>{
        let workerItr = workerAddToCartSaga({type: "ADD_TO_CART_A", payload: 1})
        expect(workerItr.next(1).value).toEqual(put(addToCartAction(1))) 
        expect(workerItr.next().done).toBeTruthy()
    })
})

describe("remove from cart worker saga",()=>{
    it("must remove products from reducer cart", ()=>{
        let workerItr = workerRemoveFromCartSaga({type: "REMOVE_FROM_CART_A", payload: 1})
        expect(workerItr.next(1).value).toEqual(put(removeFromCartAction(1))) 
        expect(workerItr.next().done).toBeTruthy()
    })
})

describe("checkout worker saga",()=>{
    const localStorageMock = (function () {
        let store:any = {};
        return {
          getItem(key:string) {
            return store[key];
          },
      
          setItem(key:string, value:string) {
            store[key] = value;
          },
      
          clear() {
            store = {};
          },
      
          removeItem(key:string) {
            delete store[key];
          },
      
          getAll() {
            return store;
          },
        };
      })();
    Object.defineProperty(window, "localStorage", { value: localStorageMock, configurable: true });
    
    it("must clear cart storage", ()=>{
        window.localStorage.setItem("cart", JSON.stringify({data:"jkdksdj"}));
        let workerItr = workerCheckoutSaga({type: "CHECKOUT"})
        window.localStorage.removeItem("cart")
        expect(window.localStorage.getItem("cart")).toBeUndefined()
        expect(workerItr.next().value).toEqual(put(clearCartAction()))
        expect(workerItr.next().done).toBeTruthy()
        window.localStorage.clear()
    })
    it("must return other storage contents after clearing cart from local storage", ()=>{
        window.localStorage.setItem("cart", "jkdksdj")
        window.localStorage.setItem("user", "jkdksdj")
        let workerItr = workerCheckoutSaga({type: "CHECKOUT"})
        window.localStorage.removeItem("cart")
        expect(window.localStorage.getItem("cart")).toBeUndefined()
        expect(window.localStorage.getItem("user")).toEqual("jkdksdj")
        expect(workerItr.next().value).toEqual(put(clearCartAction()))
        expect(workerItr.next().done).toBeTruthy()
        window.localStorage.clear()
    })
})

describe('check catalogue component render', () => {
    let store;
    beforeEach(()=>{
        store = mockStore({
            loginReducer: {
                isUserLoggedIn: true,
                user: {
                    name: "eve.holt@reqres.in",
                    email: "cityslicka",
                    token: "QpwL5tke4Pnpja7X"
                },
                error: ""
            },
            productReducer:{
                activeCategory:"",
                allCategories:['electronics', 'jewelery', "men's clothing", "women's clothing"],
                allProducts:[{
                    id :1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price:109.95,
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    category:"men's clothing",
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    rating:{"rate":3.9,"count":120}
                }, {
                    "id": 7,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                      "rate": 3,
                      "count": 400
                    }
                  }],
                activeProducts:[],
                cart:[]
            },
            signUpReducer:{
                isUserSignedUp:false,
                user:{
                    id:null,
                    email:"",
                    token:""
                },
                error:""
            }
          });
          render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
            );
        })
        
    test("must render catalogue page",()=>{
        expect(screen.getByText("Products")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Products"))
        expect(screen.getByText("Search")).toBeInTheDocument(); ;
        expect(screen.getByText("Filter by Category:")).toBeInTheDocument(); 
        expect(screen.queryByText("Remove Filter")).not.toBeInTheDocument();
    })

    test("must render remove filter button", async()=>{
        fireEvent.click(screen.getByText(/jewelery/i));
        store = mockStore({
            loginReducer: {
                isUserLoggedIn: true,
                user: {
                    name: "eve.holt@reqres.in",
                    email: "cityslicka",
                    token: "QpwL5tke4Pnpja7X"
                },
                error: ""
            },
            productReducer:{
                activeCategory:"jewelery",
                allCategories:['electronics', 'jewelery', "men's clothing", "women's clothing"],
                allProducts:[{
                    id :1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price:109.95,
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    category:"men's clothing",
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    rating:{"rate":3.9,"count":120}
                }, {
                    "id": 7,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                      "rate": 3,
                      "count": 400
                    }
                  }],
                activeProducts:[{
                    "id": 7,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                      "rate": 3,
                      "count": 400
                    }
                  }],
                cart:[]
            },
            signUpReducer:{
                isUserSignedUp:false,
                user:{
                    id:null,
                    email:"",
                    token:""
                },
                error:""
            }
          });
          render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
            );
        expect(await screen.findByText(/remove filter/i)).toBeInTheDocument();
    })

    test("must render product cards", ()=>{
        expect(screen.getAllByText(/Add To Cart/i)).toHaveLength(2);
    })

    test("must render only matching products for searched word",()=>{
        expect(screen.getByText("Search")).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/search/i)).toHaveValue("")
        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: 'white' },
        });
        expect(screen.getAllByText("Add To Cart")).toHaveLength(1)
    })

    test("must render remove from cart button on clicking add to cart button", ()=>{
        fireEvent.click(screen.getAllByText(/Add To Cart/i)[0])
        expect(screen.getAllByText(/Remove From Cart/i)).toHaveLength(1);
        fireEvent.click(screen.getAllByText(/Add To Cart/i)[0])
        expect(screen.getAllByText(/Remove From Cart/i)).toHaveLength(2);
    })
});

describe("must render only active category products on setting active category",()=>{
    let store;
    test("must render on jewelery category products only", async()=>{
        store = mockStore({
            loginReducer: {
                isUserLoggedIn: true,
                user: {
                    name: "eve.holt@reqres.in",
                    email: "cityslicka",
                    token: "QpwL5tke4Pnpja7X"
                },
                error: ""
            },
            productReducer:{
                activeCategory:"jewelery",
                allCategories:['electronics', 'jewelery', "men's clothing", "women's clothing"],
                allProducts:[{
                    id :1,
                    title:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                    price:109.95,
                    description:"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                    category:"men's clothing",
                    image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                    rating:{"rate":3.9,"count":120}
                }, {
                    "id": 7,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                      "rate": 3,
                      "count": 400
                    }
                  }],
                activeProducts:[{
                    "id": 7,
                    "title": "White Gold Plated Princess",
                    "price": 9.99,
                    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                    "category": "jewelery",
                    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
                    "rating": {
                      "rate": 3,
                      "count": 400
                    }
                  }],
                cart:[]
            },
            signUpReducer:{
                isUserSignedUp:false,
                user:{
                    id:null,
                    email:"",
                    token:""
                },
                error:""
            }
          });
          render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
            );
        expect(await screen.findAllByText(/Add To Cart/i)).toHaveLength(1);
    })
})


