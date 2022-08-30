import { setSignUpErrorType, setUserActionType, SignUpErrorType, SignUpRequestType, SignUpUser, signUpUserActionType } from "../types/signup.types";

  //ACTIONS 
  export const signUpUserAction=(payload:SignUpRequestType):signUpUserActionType=>{
    return({type: "SIGN_UP_USER", payload})
  }

  export const setUserAction = (payload: SignUpUser):setUserActionType=>{
    return({type:"SET_USER", payload})
  }
  
  export const setSignUpError=(payload: SignUpErrorType):setSignUpErrorType=>{
    return({type:"SIGN_UP_ERROR", payload})
  }