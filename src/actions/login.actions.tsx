import { ClearUser, clearUserActionType, LoginErrorType, LoginRequestType, LoginUser, loginUserActionType, logoutActionType, setLoginErrorType, setUserActionType } from "../types/login.types";

  //ACTIONS 
  export const loginUserAction=(payload:LoginRequestType):loginUserActionType=>{
    return({type: "LOGIN_USER", payload})
  }

  export const setUserAction = (payload: LoginUser):setUserActionType=>{
    console.log("set", payload)
    return({type:"SET_USER", payload})
  }
  
  export const clearUserAction = ():clearUserActionType=>{
    console.log("at fetchAction creator")
    return({type:"CLEAR_USER", payload: {isUserLoggedIn: false}})
  }
  
  export const setLoginError=(payload: LoginErrorType):setLoginErrorType=>{
    return({type:"LOGIN_ERROR", payload})
  }

  export const logoutUserAction=():logoutActionType=>{
    return {type: "LOGOUT"}
  }