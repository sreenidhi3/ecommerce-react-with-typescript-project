import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from './store';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

test('renders learn react link', () => {
  let store = mockStore({
    loginReducer: {
        isLoading: false,
        isUserLoggedIn: true,
        user: {
            name: "eve.holt@reqres.in",
            email: "cityslicka",
            token: "QpwL5tke4Pnpja7X"
        },
        error: "",
        activeTab:0
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
        <App />
        </BrowserRouter>
    </Provider>
    );
  const linkElement = screen.getByText("FleekStore");
  expect(linkElement).toBeInTheDocument();
});
