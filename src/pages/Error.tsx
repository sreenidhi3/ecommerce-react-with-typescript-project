import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setTimeout } from "timers";

const Error = ()=>{
    let navigate = useNavigate()
    return(
        <div>
            <h1>Oops! Page Not Found</h1>
            <p>Go back to <Link to="/" style={{color: "var(--primary-color)"}}>Home</Link></p>
        </div>
    )
}

export default Error;