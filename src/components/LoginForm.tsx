import { stat } from 'fs'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserAction, loginUserAction } from '../actions/login.actions'
// import { login } from '../services/login.service'
// import { loginReducer } from '../reducers/login.reducers'
import { RootState } from '../store'
import { LoginUser } from '../types/login.types'
const LoginForm =()=>{
    const state = useSelector((state: RootState) => state.loginReducer);
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [errEmail, setErrEmail] = useState("")
    const [errPassword, setErrPassword] = useState("")
    let user:LoginUser;

    useEffect(()=>{
        if (localStorage.getItem("token")){
            user = JSON.parse(localStorage.getItem('user') as string)
            if(user!==null){
                console.log("not here")
                dispatch(setUserAction(user))
            }
        }
        if(state.isUserLoggedIn){
            localStorage.setItem("user", JSON.stringify({email, token: state.user.token}))
            navigate("/products") 
        }
        // console.log("hi")
    })

    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const handleSubmit = async (e:any)=>{
        // e.preventDefault()
        // const data = await login({email, password})
        dispatch(loginUserAction({email, password}))
        // console.log(data)
        // navigate("/products")
    }

    function validateEmail(value: string): void {
        if (!emailRegex.test(value)) {
            setErrEmail("Enter a valid email")
        }else{
            setErrEmail("")
        }
        setEmail(value)
    }  
    function validatePassword(value: string): void {
        if(value.length < 6){
            setErrPassword("Password should be greater than 6 characters")
        }else{
            setErrPassword("")
        }
        setPassword(value)
    }    
    return(
        <div className='container'>
            <form id="login-form">
            <h2>Welcome Back</h2>
            <h3 style={{color: "var(--primary-color)"}}>Login to continue</h3>
                <div className='label'>
                    <label htmlFor="email">Email:</label>
                    <input value={email} placeholder="john.doe@email.com" id="email" type="email" role="email-input" onChange={(e)=>validateEmail(e.target.value)}/>
                    {errEmail ? (<div className='error-msg'>{errEmail}</div>) : ("")}
                    {/* <div className='error-msg'>{errEmail}</div> */}
                </div>
                <div className='label'>
                    <label htmlFor="password">Password:</label>
                    <input value={password} placeholder="******" type="password" id="password" role="password-input" onChange={(e)=>validatePassword(e.target.value)}/>
                    {errPassword ? (<div className='error-msg'>{errPassword}</div>) : ("")}
                    {/* <div className='error-msg'>{errPassword}</div> */}
                </div>
                {state.error ? (<div role="login-cred-error" className='error-msg'>{state.error}</div>) : ("")}
                
                <button type="button" role="submit-form" className='btn-primary-full' disabled={(errEmail || errPassword) ? true : false } onClick={(e)=>handleSubmit(e)}>Submit</button>
            </form>
        </div>
    )
}

export default LoginForm;

