export interface LoginReducerActionType{
    type:string;
    payload?:LoginUser | ClearUser | LoginErrorType;
}

export interface LoginUserState{
    isUserLoggedIn: boolean
    user: LoginUser,
    error: string
}

export interface LoginUser{
    name?: string;
    token: string;
    email: string;
}

export interface ClearUser{
    isUserLoggedIn : false
}

export interface LoginErrorType{
    error: string;
}

export interface LoginRequestType{
    email: string,
    password: string
}

export interface LoginResponseType{
    token: string
}

export interface LoginActionsType{
    SET_USER: "SET_USER",
    CLEAR_USER: "CLEAR_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT"
}
  
export const LoginReducerActionsType:LoginActionsType = {
    SET_USER: "SET_USER",
    CLEAR_USER: "CLEAR_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT"
}

export interface setUserActionType{
    type: LoginActionsType["SET_USER"]
    payload: LoginUser;
}

export interface clearUserActionType{
    type: LoginActionsType["CLEAR_USER"],
    payload: ClearUser
}

export interface loginUserActionType{
    type: LoginActionsType["LOGIN_USER"],
    payload: LoginRequestType
}

export interface setLoginErrorType{
    type: LoginActionsType["LOGIN_ERROR"],
    payload: LoginErrorType
}

export interface logoutActionType{
    type: LoginActionsType["LOGOUT"]
}