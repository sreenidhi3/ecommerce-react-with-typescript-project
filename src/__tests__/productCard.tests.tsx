import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ProductCard from '../components/ProductCard';
import { RootState } from '../store';
import { ProductType } from '../types/products.types';

const mockStore = configureStore<RootState>([]);

describe("check product card render",()=>{
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
          let prod:ProductType = {
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
          }
          render(
            <Provider store={store}>
                <BrowserRouter>
                    <ProductCard {...prod}/>
                </BrowserRouter>
            </Provider>
            );
    })
    test("must render product image",()=>{
        expect(screen.getByAltText("White Gold Plated Princess")).toBeInTheDocument()
    })
    test("must render product price",()=>{
        expect(screen.getByText(/9.99/i)).toBeInTheDocument()
    })
    test("must render product title",()=>{
        expect(screen.getByText(/Gold/i)).toBeInTheDocument()
    })
    test("must render add to cart button",()=>{
        expect(screen.getByText(/Add to Cart/i)).toBeInTheDocument()
    })
    test("must render remove from cart button on click",()=>{
        fireEvent.click(screen.getByText(/Add to Cart/i))
        expect(screen.getByText(/Remove From Cart/i)).toBeInTheDocument()
    })
})