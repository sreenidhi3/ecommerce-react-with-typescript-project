export interface SignUpReducerActionType{
    type:string;
    payload?: SignUpUser | SignUpErrorType;
}

export interface SignUpUserState{
    isUserSignedUp: boolean
    user: SignUpUser,
    error: string
}

export interface SignUpUser{
    id: number | null;
    token: string;
    email: string;
}


export interface SignUpErrorType{
    error: string;
}

export interface SignUpRequestType{
    email: string,
    password: string
}

export interface SignUpResponseType{
    id: number;
    token: string
}

export interface SignUpActionsType{
    SET_USER: "SET_USER",
    SIGN_UP_USER: "SIGN_UP_USER",
    SIGN_UP_ERROR: "SIGN_UP_ERROR"
}
  
export const SignUpReducerActionsType:SignUpActionsType = {
    SET_USER: "SET_USER",
    SIGN_UP_USER: "SIGN_UP_USER",
    SIGN_UP_ERROR: "SIGN_UP_ERROR"
}

export interface setUserActionType{
    type: SignUpActionsType["SET_USER"]
    payload: SignUpUser;
}

export interface signUpUserActionType{
    type: SignUpActionsType["SIGN_UP_USER"],
    payload: SignUpRequestType
}

export interface setSignUpErrorType{
    type: SignUpActionsType["SIGN_UP_ERROR"],
    payload: SignUpErrorType
}