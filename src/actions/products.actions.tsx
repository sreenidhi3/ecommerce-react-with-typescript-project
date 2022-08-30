import { addToCartActionAType, addToCartActionType, CategoryType, checkoutActionType, clearCartActionType, fetchCategoriesActionType, fetchProductsActionType, ProductType, removeFromCartActionAType, removeFromCartActionType, setActiveCategoryActionType, setActiveCategoryProductsActionType, setCartActionType, setCategoriesActionType, setProductsActionType, singleCategoryType } from "../types/products.types"

export const setProductsAction=(payload:ProductType[]):setProductsActionType=>{
    return({type: "SET_PRODUCTS", payload})
}

export const setCategoriesAction=(payload:singleCategoryType[]):setCategoriesActionType=>{
    return({type: "SET_CATEGORIES", payload})
}

export const setActiveCategoryAction=(payload:singleCategoryType):setActiveCategoryActionType=>{
    return({type: "SET_ACTIVE_CATEGORY", payload})
}

export const setActiveCategoryProductsAction=(payload:ProductType[]):setActiveCategoryProductsActionType=>{
    return({type: "SET_ACTIVE_CATEGORY_PRODUCTS", payload})
}

export const fetchProductsAction=():fetchProductsActionType=>{
    return({type: "FETCH_PRODUCTS"})
}

export const fetchCategoriesAction=():fetchCategoriesActionType=>{
    return({type: "FETCH_CATEGORIES"})
}

export const addToCartAction=(payload:number):addToCartActionType=>{
    return({type: "ADD_TO_CART", payload})
}

export const removeFromCartAction=(payload:number):removeFromCartActionType=>{
    return({type: "REMOVE_FROM_CART", payload})
}

export const addToCartActionA=(payload:number):addToCartActionAType=>{
    return({type: "ADD_TO_CART_A", payload})
}

export const removeFromCartActionA=(payload:number):removeFromCartActionAType=>{
    // console.log("in action")
    return({type: "REMOVE_FROM_CART_A", payload})
}

export const checkoutAction=():checkoutActionType=>{
    return({type:"CHECKOUT"})
}

export const clearCartAction=():clearCartActionType=>{
    return({type:"CLEAR_CART"})
}

export const setCartAction=(payload: ProductType[]):setCartActionType=>{
    return({type:"SET_CART", payload})
}