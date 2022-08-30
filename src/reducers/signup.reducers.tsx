import { useReducer } from "react";
import { SignUpReducerActionType, SignUpUser, SignUpUserState } from "../types/signup.types";

let initialState:SignUpUserState = {
    isUserSignedUp: false,
    user: {
        id: null,
        email:"",
        token:"",
    },
    error: ""
}

export const signUpReducer = (state=initialState, action: SignUpReducerActionType):SignUpUserState=>{
    switch(action.type){
        case "SET_USER":{
            console.log(action.payload);
            return {...state, user: action.payload as SignUpUser, isUserSignedUp: true}
        }
        case "CLEAR_USER":{
            console.log(action.payload);
            return {...initialState, isUserSignedUp:false}
        }
        case "SIGN_UP_ERROR":{
            console.log(action.payload)
            return {...initialState, isUserSignedUp:false, ...action.payload}
        }
        default:
            return state
    }
}