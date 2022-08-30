import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCartActionA, removeFromCartAction, removeFromCartActionA } from "../actions/products.actions"
import { RootState } from "../store"
import "../styles/products.styles.css"
import { ProductType } from "../types/products.types"

const CartCard:FC<ProductType>=(prod:ProductType)=>{
    const {cart} = useSelector((state: RootState) => state.productReducer);
    const dispatch =  useDispatch();
    const handleRemove=(id:number)=>{
            dispatch(removeFromCartActionA(id))
    }
    // console.log("cart: ", cart)
    
    return(
        <div style={{margin: "1rem", paddingBottom: "2rem", borderBottom: "1px solid var(--secondary-500)", width: "80%"}} className="row center">
                <div className="row center">
                    <img className="img-cart" src={prod.image} alt={prod.title}/>
                </div>
                <div className="col center">
                    <h3> {prod.title} </h3> 
                    <h4> US ${prod.price}</h4>
                    <button onClick={()=>handleRemove(prod.id)} style={{width:"13rem"}} className="btn-primary">Remove From Cart</button>
                </div>
        </div>
    )
}

export default CartCard;