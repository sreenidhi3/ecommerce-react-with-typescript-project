export interface LoginReducerActionType{
    type:string;
    payload?:LoginUser | ClearUser | LoginErrorType | number |boolean;
}

export interface LoginUserState{
    activeTab : number,
    isLoading: boolean;
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
    SET_LOADING: "SET_LOADING",
    SET_USER_L: "SET_USER_L",
    CLEAR_USER: "CLEAR_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT",
    SET_ACTIVE: "SET_ACTIVE"
}
  
export const LoginReducerActionsType:LoginActionsType = {
    SET_LOADING: "SET_LOADING",
    SET_USER_L: "SET_USER_L",
    CLEAR_USER: "CLEAR_USER",
    LOGIN_USER: "LOGIN_USER",
    LOGIN_ERROR: "LOGIN_ERROR",
    LOGOUT: "LOGOUT",
    SET_ACTIVE: "SET_ACTIVE"
}

export interface setUserActionType{
    type: LoginActionsType["SET_USER_L"]
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

export interface setActiveActionType{
    type: LoginActionsType["SET_ACTIVE"],
    payload: number
}

export interface setLoadingActionType{
    type: LoginActionsType["SET_LOADING"],
    payload: boolean
}