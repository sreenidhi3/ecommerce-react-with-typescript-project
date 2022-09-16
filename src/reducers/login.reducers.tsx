import { useReducer } from "react";
import { LoginErrorType, LoginReducerActionType, LoginUser, LoginUserState } from "../types/login.types";

let initialState:LoginUserState = {
    isLoading: false,
    activeTab: 10,
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
        case "SET_ACTIVE":{
            return {...state, activeTab: action.payload as number}
        }
        case "SET_LOADING":{
            return {...state, isLoading: action.payload as boolean}
        }
        case "SET_USER_L":{
            // console.log(action.payload);
            return {...state, user: action.payload as LoginUser, isUserLoggedIn: true}
        }
        case "CLEAR_USER":{
            // console.log(action.payload);
            return {...initialState, isUserLoggedIn:false}
        }
        case "LOGIN_ERROR":{
            // console.log(action.payload)
            return {...initialState, isUserLoggedIn:false, ...action.payload as LoginErrorType}
        }
        case "LOGOUT":{
            return {...initialState}
        }
        default:
            return state
    }
}