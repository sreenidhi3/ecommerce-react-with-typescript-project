import { stat } from 'fs'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserAction, loginUserAction, setActiveAction, setLoadingAction, setLoginError } from '../actions/login.actions'
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
        dispatch(setActiveAction(3))
    },[state.activeTab])
    useEffect(()=>{
        if (localStorage.getItem("token")){
            user = JSON.parse(localStorage.getItem('user') as string)
            if(user!==null){
                // console.log("not here")
                dispatch(setUserAction(user))
            }
        }
        if(state.isUserLoggedIn){
            localStorage.setItem("user", JSON.stringify({email, token: state.user.token}))
            navigate("/products") 
        }
        // console.log("hi")
    },[])

    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const handleSubmit = async (e:any)=>{
        let validEmail:boolean = false;
        let validPassword:boolean = false;
        if (!emailRegex.test(email)) {
            console.log(!emailRegex.test(email))
            setErrEmail("Enter a valid email")  
            validEmail =  false
        }else{
            console.log("email else")
            setErrEmail("")
            validEmail = true
        }
        if(password.length < 6){
            console.log(password.length < 6)
            setErrPassword("Password should be greater than 6 characters")
            validPassword = false
        }else{
            console.log("Password else")
            setErrPassword("")
            validPassword = true
        }
        if(validEmail && validPassword){
            dispatch(loginUserAction({email, password}))
        }
    }

    return(
        <div className='container'>
            <form id="login-form">
            <h2>Welcome Back</h2>
            <h3 style={{color: "var(--primary-color)"}}>Login to continue</h3>
                <div className='label'>
                    <label htmlFor="email">Email:</label>
                    <input 
                    value={email} 
                    autoFocus={true} 
                    placeholder="john.doe@email.com" 
                    id="email" 
                    type="email" 
                    role="email-input" 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                        dispatch(setLoginError({error:""}))
                        if(errEmail!==""){
                            setErrEmail("")
                            dispatch(setLoginError({error:""}))
                        }
                        }
                    }
                    />
                    {errEmail ? (<div className='error-msg'>{errEmail}</div>) : ("")}
                    {/* <div className='error-msg'>{errEmail}</div> */}
                </div>
                <div className='label'>
                    <label htmlFor="password">Password:</label>
                    <input 
                    value={password} 
                    placeholder="******" 
                    type="password" 
                    id="password" 
                    role="password-input" 
                    onChange={(e)=>{
                            setPassword(e.target.value)
                            dispatch(setLoginError({error:""}))
                            if(errPassword!==""){
                                setErrPassword("")
                                dispatch(setLoginError({error:""}))
                            }
                        }
                    }
                    />
                    {errPassword ? (<div className='error-msg'>{errPassword}</div>) : ("")}
                    {/* <div className='error-msg'>{errPassword}</div> */}
                </div>
                {state.error ? (<div role="login-cred-error" className='error-msg'>{state.error}</div>) : ("")}
                
                <button 
                    type="button" 
                    role="submit-form" 
                    className='btn-primary-full' 
                    disabled={(email==="" || password==="" || errEmail!=="" || errPassword!=="") ? true : false } 
                    onClick={(e)=>handleSubmit(e)}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LoginForm;

