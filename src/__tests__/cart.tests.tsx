import { fireEvent, render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import configureStore from 'redux-mock-store';
import { RootState } from "../store";


const mockStore = configureStore<RootState>([]);


describe('check cart component render', () => {
    let store=mockStore();
    beforeAll(()=>{
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

    test("must render catalogue page on clicking 'Start Shopping here'",()=>{
        fireEvent.click(screen.getByText("Cart"))
        expect(screen.getByText("Your Store Cart is empty")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Start Shopping here"))
        expect(screen.getByText("Search")).toBeInTheDocument()
    })

    test("must render amount on screen if cart not empty",()=>{
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
                cart:[{
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
                  }]
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
        fireEvent.click(screen.getByText("Cart"))
        expect(screen.getByText(/Amount:/i)).toBeInTheDocument()
    })
    
    test("must render empty cart on remove from cart clicked",()=>{
          const {rerender}=render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByText("Cart"))
        expect(screen.getAllByText(/Remove/i)).toHaveLength(1)
        fireEvent.click(screen.getByText(/Remove/i))
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
        rerender(<Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>)
    })

    test("must render checkout page on click",()=>{
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
                cart:[{
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
                  }]
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
        const {rerender}=render(
          <Provider store={store}>
              <BrowserRouter>
                  <App/>
              </BrowserRouter>
          </Provider>
      );
      fireEvent.click(screen.getByText("Cart"))
      expect(screen.getAllByText(/Remove/i)).toHaveLength(1)
      fireEvent.click(screen.getByText(/Checkout/i))
      expect(screen.getByText(/Proceed with Payment/i)).toBeInTheDocument()
    })

    test("must render success page on payment option clicked",()=>{
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
                    cart:[{
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
                    }]
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
            const {rerender}=render(
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    fireEvent.click(screen.getByText("Cart"))
    expect(screen.getAllByText(/Remove/i)).toHaveLength(1)
    fireEvent.click(screen.getByText(/Checkout/i))
    fireEvent.click(screen.getByText(/Cash/i))
    expect(screen.getByText(/Order Placed/i)).toBeInTheDocument()
    })

    test("must render home page on clicking 'Back to Home'",()=>{
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
                cart:[{
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
                }]
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
        const {rerender}=render(
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    );
    fireEvent.click(screen.getByText("Cart"))
    fireEvent.click(screen.getByText(/Checkout/i))
    fireEvent.click(screen.getByText(/Cash/i))
    fireEvent.click(screen.getByText(/Back To Home/i))
    expect(screen.getAllByText("Shop Now")[0]).toBeInTheDocument()
    })
})
