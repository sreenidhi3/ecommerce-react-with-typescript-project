import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { addToCartActionA, removeFromCartAction, removeFromCartActionA } from "../actions/products.actions"
import { RootState } from "../store"
import "../styles/products.styles.css"
import { ProductType } from "../types/products.types"

const ProductCard:FC<ProductType>=(prod:ProductType)=>{
    const {isUserLoggedIn} = useSelector((state: RootState) => state.loginReducer);
    const {cart} = useSelector((state: RootState) => state.productReducer);
    const dispatch =  useDispatch();
    const navigate = useNavigate()
    const [added, setAdded] = useState<boolean>(false)
    useEffect(()=>{
        let add = cart.filter((it)=>it.id===prod.id).length
        add ? setAdded(true) : setAdded(false)
    },[])
    const handleCart=(id:number)=>{
        if(!isUserLoggedIn)
            navigate("/login")
        else{
        if(added){
            dispatch(removeFromCartActionA(id))
        }else{
            dispatch(addToCartActionA(id))
        }
        setAdded(!added)
    }

    }
    // console.log("cart: ", cart)
    
    return(
        
            <div className="product-container">
                <Link to={prod.id.toString()}>
                    <div className="row center">
                        <img className="img" src={prod.image} alt={prod.title}/>
                    </div>
                </Link>
                <div>
                    <Link to={prod.id.toString()}>
                        <h3> {prod.title} </h3> 
                    </Link>
                    {/* <p> {prod.description.slice(0,100)}... </p> */}
                    <h4> US ${prod.price}</h4>
                    <button onClick={()=>handleCart(prod.id)} className={added ?"btn-added-to-cart":"btn-primary-full"}>{added ? "Remove From Cart" : "Add To Cart"}</button>
                </div>
                {/* title */}
            </div>
       
    )
}

export default ProductCard