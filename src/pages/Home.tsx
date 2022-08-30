import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import "../styles/home.styles.css"

const Home =()=>{
    return(
        <div>
            <Banner/>
            <div className="row center">
                <Link to="/products"><button style={{margin: "1rem"}} className="row banner-btn center">Shop Now</button></Link>
            </div>
        </div>
    )
}

export default Home; 