import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUserAction } from "../actions/login.actions";
import { RootState } from "../store";
import "../styles/navBar.styles.css"

const NavBar = ()=>{
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.loginReducer);
    const {cart} = useSelector((state: RootState) => state.productReducer);
    return(
        <nav className="navbar">
            <div className="brand-logo">
            <Link to="/">Store</Link>
            </div>
           
            <div className="nav-links">
            <div className="nav-link">
            <Link to="/products">Products</Link>
            </div>
            { state.isUserLoggedIn ? (
                <div className="nav-links">
                    <div className="nav-link">
                    <Link to="/cart">Cart <span className="cart-count">{cart.length}</span></Link>
                    </div>
                    <div className="nav-link" onClick={()=>dispatch(clearUserAction())}>
                    <Link to="/">Logout</Link>
                    </div>
                </div>
           ) : (
           <div className="nav-links">
                <div className="nav-link">
                <Link to="/login">Login</Link>
                </div>
                <div className="nav-link">
                <Link to="/signup">SignUp</Link>
                </div>
            </div>
            )
        }
        </div>
        </nav>
    )
}

export default NavBar;