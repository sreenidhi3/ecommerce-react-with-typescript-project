import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error";
import configureStore from 'redux-mock-store';


const mockStore = configureStore([]);
describe('Logged In User', () => {
    let store;
    beforeEach(() => {
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
    });
  
    test("must render logged in state navbar on render",()=>{
        expect(screen.getByText("Logout")).toBeInTheDocument()
    })

    test("must render home page on click on store",()=>{
        expect(screen.getAllByRole('button', { name: /shop/i })[0]).toBeInTheDocument()
        fireEvent.click(screen.getByText("Store"))
        expect(screen.getAllByRole('button', { name: /shop/i })[1]).toBeInTheDocument()
    })
        
    test("must render catalogue page on click on shop now button",()=>{
        expect(screen.getAllByRole('button', { name: /shop/i })[0]).toBeInTheDocument()
        fireEvent.click(screen.getAllByRole('button', { name: /shop/i })[0])
        expect(screen.getByText("Search")).toBeInTheDocument(); ;
        expect(screen.getByText("Filter by Category:")).toBeInTheDocument(); ;
    })
        
    test("must render catalogue page on click on products page",()=>{
        expect(screen.getByText("Products")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Products"))
        expect(screen.getByText("Search")).toBeInTheDocument(); ;
        expect(screen.getByText("Filter by Category:")).toBeInTheDocument(); ;
    })

    test("must render single product details page on click product card",()=>{
        expect(screen.getByText("Products")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Products"))
        expect(screen.getByText(/Fjallraven/i)).toBeInTheDocument()
        fireEvent.click(screen.getByText(/Fjallraven/i))
        expect(screen.getByText(/Perfect/i)).toBeInTheDocument()
    })

    test("must render cart page",()=>{
        expect(screen.getByText("Logout")).toBeInTheDocument()
        fireEvent.click(screen.getByText("Cart"))
        expect(screen.getByText("Your Store Cart is empty")).toBeInTheDocument(); ;
    })
  });


  describe('Logged Out User', () => {
    let store;
    beforeEach(() => {
      store = mockStore({
        loginReducer: {
            isUserLoggedIn: false,
            user: {
                name: "",
                email: "",
                token: ""
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
    });
  
    test("must render logged out state navbar on render",()=>{
        expect(screen.getByText("Login")).toBeInTheDocument()
    })

    test("must render login page on click on login nav-link",()=>{
        fireEvent.click(screen.getByText("Login"))
        expect(screen.getByText("Welcome Back")).toBeInTheDocument()
    })

    test("must render login page on click on login nav-link",()=>{
        fireEvent.click(screen.getByText("SignUp"))
        expect(screen.getByText("Sign Up")).toBeInTheDocument()
    })
  });


describe("check error page render", ()=>{
    let store;
    beforeEach(()=>{
        store = mockStore({
            loginReducer: {
                isUserLoggedIn: false,
                user: {
                    name: "",
                    email: "",
                    token: ""
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
                    <Error/>
                </BrowserRouter>
            </Provider>
            );
    })
    test("must render 404 page",()=>{
        expect(screen.getByText(/Oops!/i)).toBeInTheDocument()
    })
    test("must render home page on click 'Go back to Home'",async()=>{
        const linkElem = screen.getByRole('link', { name: "Home" })
        expect(linkElem).toHaveAttribute('href', '/')
    })
})