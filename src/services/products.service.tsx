import { ProductActionsType, ProductType, singleCategoryType } from "../types/products.types"

export const fetchAllProducts=():Promise<ProductType[]>=>{
    return fetch('https://fakestoreapi.com/products')
    .then(res=>{return res.json()})
    .catch((err)=>{
        console.log(err)
        return err
        // throw(err)
    })
}

export const fetchAllCategories=():Promise<singleCategoryType[]>=>{
    return fetch('https://fakestoreapi.com/products/categories')
    .then(res=>{return res.json()})
    .catch((err)=>{
        return err
        console.log(err)
        // throw(err)
    })
}