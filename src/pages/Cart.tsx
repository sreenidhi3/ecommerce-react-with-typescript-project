import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store";
import { ProductType } from "../types/products.types";
import "../styles/products.styles.css"
import CartCard from "../components/CartCard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Cart=()=>{
    const {isUserLoggedIn, user} = useSelector((state:RootState)=> state.loginReducer)
    const {cart} = useSelector((state: RootState) => state.productReducer);
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isUserLoggedIn){
            navigate("/login")
        }
    },[])
    const calculateAmt=()=>{
        var amt:number=0;
        cart.map((item)=>{
            amt = amt+item.price
        })
        return amt;
    }

    return(
        <div>
            {
            cart.length === 0 ? 
            (<div className="col center">
                <h3 className="text-center">Your Store Cart is empty</h3>
                <p><Link to="/products" style={{color:"var(--primary-color)"}}>Start Shopping here</Link></p>
                </div>) 
            : 
            ""
            }
            <div className="col center">
                {cart.length !==0 ? <div className="col center">
                    <h3>Total Amount: ${calculateAmt()}</h3>
                    <Link to="/payment"><button style={{backgroundColor: "var(--green-600)"}} className="btn-primary">Checkout</button></Link>
                    </div>
                    :
                    ""
                }
                
            </div>
            <div className="row center">
            { cart.map((prod)=><CartCard key={prod.id} {...prod}/>)}
                {/* <ProductCard prod = {allProducts[0]}/> */}
            </div>
        </div>
    )
}

export default Cart;