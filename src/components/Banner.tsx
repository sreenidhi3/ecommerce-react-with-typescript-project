import { Link } from "react-router-dom";
import "../styles/home.styles.css"
const Banner=()=>{
    return(
        <div>
            <div className="banner-container row center">
            <Link to="/products"><button className="banner-btn center">Shop Now</button></Link>
            </div>
        </div>
    )
}

export default Banner;