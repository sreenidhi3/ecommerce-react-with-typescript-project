import { useReducer } from "react";
import { LoginReducerActionType, LoginUser, LoginUserState } from "../types/login.types";

let initialState:LoginUserState = {
    isUserLoggedIn: false,
    user: {
        name: "",
        email:"",
        token:"",
    },
    error: ""
}

export const loginReducer = (state=initialState, action: LoginReducerActionType):LoginUserState=>{
    switch(action.type){
        case "SET_USER":{
            console.log(action.payload);
            return {...state, user: action.payload as LoginUser, isUserLoggedIn: true}
        }
        case "CLEAR_USER":{
            console.log(action.payload);
            return {...initialState, isUserLoggedIn:false}
        }
        case "LOGIN_ERROR":{
            console.log(action.payload)
            return {...initialState, isUserLoggedIn:false, ...action.payload}
        }
        case "LOGOUT":{
            return {...initialState}
        }
        default:
            return state
    }
}