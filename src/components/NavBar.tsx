import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUserAction } from "../actions/login.actions";
import { RootState } from "../store";
import "../styles/navBar.styles.css"
type propsType= {
    isActive: number
}
const NavBar = ()=>{
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.loginReducer);
    const {cart} = useSelector((state: RootState) => state.productReducer);
    return(
        <nav className="navbar">
            <div className="brand-logo">
            <Link to="/">FleekStore</Link>
            </div>
           
            <div className="nav-links">
            <div className="nav-link" 
                style={{
                    fontWeight: state.activeTab === 1 ? "bold": "normal",
                    fontSize:state.activeTab === 1 ? "large": "medium"
                }}>
            <Link to="/products">Products</Link>
            </div>
            { state.isUserLoggedIn ? (
                <div className="nav-links">
                    <div className="nav-link" 
                        style={{
                            fontWeight: state.activeTab === 2 ? "bold": "normal",
                            fontSize:state.activeTab === 2 ? "large": "medium"
                        }}>
                    <Link to="/cart">Cart <span className="cart-count">{cart.length}</span></Link>
                    </div>
                    <div className="nav-link" 
                        style={{
                            fontWeight: state.activeTab === 5 ? "bold": "normal",
                            fontSize:state.activeTab === 5 ? "large": "medium"
                        }} 
                        onClick={()=>dispatch(clearUserAction())}>
                    <Link to="/">Logout</Link>
                    </div>
                </div>
           ) : (
           <div className="nav-links">
                <div className="nav-link" 
                    style={{
                        fontWeight: state.activeTab === 3 ? "bold": "normal",
                        fontSize: state.activeTab === 3 ? "large": "medium"
                    }}>
                <Link to="/login">Login</Link>
                </div>
                <div className="nav-link" 
                    style={{
                        fontWeight: state.activeTab === 4 ? "bold": "normal",
                        fontSize:state.activeTab === 4 ? "large": "medium"
                    }}>
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