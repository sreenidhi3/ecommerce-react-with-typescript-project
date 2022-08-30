import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkoutAction } from "../actions/products.actions";
import { RootState } from "../store";
import "../styles/products.styles.css"

const Payment = ()=>{
    const dispatch = useDispatch()
    const {isUserLoggedIn, user} = useSelector((state:RootState)=> state.loginReducer)
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isUserLoggedIn){
            navigate("/login")
        }
    },[])
    return(
        <div className="p-2">
            <h1 className="text-center">Proceed with Payment</h1>
            <p>Choose one of the following payment options: </p>
            <div className="row">
                <Link to="/success">
                    <div className="option" >
                        COD - Cash on Deliver
                    </div>
                </Link>
                <Link to="/success">
                <div className="option">
                    Online UPI
                </div >
                </Link>
                <Link to="/success">
                <div className="option">
                    Credit Cards
                </div >
                </Link>
                <Link to="/success">
                <div className="option">
                    Debit Cards
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Payment;