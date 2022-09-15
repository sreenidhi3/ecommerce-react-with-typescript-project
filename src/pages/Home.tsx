import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveAction } from "../actions/login.actions";
import Banner from "../components/Banner";
import "../styles/home.styles.css"

const Home =()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setActiveAction(10))
    },[])
    return(
        <div>
            <Banner/>
            <div className="row center">
            </div>
        </div>
    )
}

export default Home; 