import { useReducer } from "react";
import { CategoryType, ProductReducerActionType, ProductStateType, ProductType, singleCategoryType } from "../types/products.types";
import { SignUpReducerActionType, SignUpUser, SignUpUserState } from "../types/signup.types";

let initialState:ProductStateType = {
    activeCategory:"",
    allCategories: [],
    allProducts: [],
    activeProducts: [],
    cart:[]
}

export const productReducer = (state=initialState, action: ProductReducerActionType):ProductStateType=>{
    switch(action.type){
        case "SET_PRODUCTS":{
            // console.log(action.payload);
            return {...state, allProducts:[...action.payload as ProductType[]]}
        }
        case "SET_CATEGORIES":{
            // console.log(action.payload);
            return {...state, allCategories:[...action.payload as singleCategoryType[]]}
        }
        case "SET_ACTIVE_CATEGORY":{
            console.log(action.payload)
            let products = state.allProducts.filter((p)=>p.category === action.payload)
            return {...state,activeProducts:[...products] ,activeCategory: action.payload as singleCategoryType}
        }
        case "SET_ACTIVE_CATEGORY_PRODUCTS":{
            return {...state, activeProducts:[...action.payload as ProductType[]]}
        }
        case "ADD_TO_CART":{
            const newProd = state.allProducts.filter((p)=>p.id===action.payload)
            localStorage.setItem("cart", JSON.stringify({cart: [...state.cart, ...newProd]}))
            return {...state, cart: [...state.cart, ...newProd] as ProductType[]}
        }
        case "SET_CART":{
            return {...state, cart: [...action.payload as ProductType[]]}
        }
        case "REMOVE_FROM_CART":{
            const filteredCart = state.cart.filter((p)=>p.id !== action.payload)
            localStorage.setItem("cart", JSON.stringify({cart: [...filteredCart]}))
            return {...state, cart: [...filteredCart]}
        }
        case "CLEAR_CART":{
            return {...state, cart: []}
        }
        default:
            return state
    }
}