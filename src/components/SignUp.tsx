import {useCallback, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../store'
import { setSignUpError, signUpUserAction } from '../actions/signup.actions'
import { setActiveAction } from '../actions/login.actions'
const SignUp =()=>{
    const state = useSelector((state: RootState) => state.signUpReducer);
    const {isUserLoggedIn} = useSelector((state:RootState)=>state.loginReducer)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [errEmail, setErrEmail] = useState("")
    const [errPassword, setErrPassword] = useState("")
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    const handleSubmit = async (e:any)=>{
        let validEmail:boolean = false;
        let validPassword:boolean = false;
        if (!emailRegex.test(email)) {
            // console.log(!emailRegex.test(email))
            setErrEmail("Enter a valid email")  
            validEmail =  false
        }else{
            // console.log("email else")
            setErrEmail("")
            validEmail = true
        }
        if(password.length < 6){
            // console.log(password.length < 6)
            setErrPassword("Password should be greater than 6 characters")
            validPassword = false
        }else{
            // console.log("Password else")
            setErrPassword("")
            validPassword = true
        }
        if(validEmail && validPassword){
            dispatch(signUpUserAction({email, password}))
        }
        
    }

    useEffect(()=>{
        dispatch(setActiveAction(4))
    },[])
    useEffect(()=>{
        if(state.isUserSignedUp){
            navigate("/login") 
        }
    })    

    // console.log("SignUp", state)
    return(
        <div className='container'>
            <form>
            <h2>Sign Up</h2>
                <div className='label'>
                    <label htmlFor="email">Email:</label>
                    <input 
                    role="email-input" 
                    autoFocus={true} 
                    value={email} 
                    placeholder="john.doe@email.com" 
                    id="email" 
                    type="email" 
                    onChange={(e)=>{
                        dispatch(setSignUpError({error:""}))
                        setEmail(e.target.value)
                        if(errEmail!==""){
                            setErrEmail("")
                            dispatch(setSignUpError({error:""}))
                        }
                        }
                    }/>
                    {errEmail ? (<div className='error-msg'>{errEmail}</div>) : ("")}
                    {/* <div className='error-msg'>{errEmail}</div> */}
                </div>
                <div className='label'>
                    <label htmlFor="password">Password:</label>
                    <input 
                    role="password-input" 
                    value={password} 
                    placeholder="******" 
                    type="password" 
                    id="password" 
                    onChange={(e)=>{
                            setPassword(e.target.value)
                            dispatch(setSignUpError({error:""}))
                            if(errPassword!==""){
                                setErrPassword("")
                                dispatch(setSignUpError({error:""}))
                            }
                        }
                    }/>
                    {errPassword ? (<div className='error-msg'>{errPassword}</div>) : ("")}
                    {/* <div className='error-msg'>{errPassword}</div> */}
                </div>
                {state.error ? (<div className='error-msg'>{state.error}</div>) : ("")}
                
                <button 
                type="button" 
                role="submit-form" 
                className='btn-primary-full' 
                disabled={(email==="" || password==="" || errEmail!=="" || errPassword!=="") ? true : false } 
                onClick={(e)=>handleSubmit(e)}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SignUp;

