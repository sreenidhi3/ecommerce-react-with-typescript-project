import LoginForm from "../components/LoginForm";
import React from 'react';
import { getByText, screen, getByLabelText, render, fireEvent } from '@testing-library/react';
import { BrowserRouter, BrowserRouterProps, Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {takeEvery, call, put} from "redux-saga/effects"
import { LoginErrorType, LoginReducerActionsType, LoginResponseType, loginUserActionType, LoginUserState } from "../types/login.types";
import {loginReducer} from "../reducers/login.reducers"
import { watcherLoginSaga, workerLoginSaga, workerLogoutSaga} from "../sagas/login.saga";
import { login } from "../services/login.service";
import { logoutUserAction, setLoginError, setUserAction } from "../actions/login.actions";
import { Provider } from "react-redux";
import store from "../store";
import App from "../App";
import NavBar from "../components/NavBar";
import { clearCartAction } from "../actions/products.actions";


describe("check login email is valid",()=>{

    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    it("abc@gmail.com must be valid", ()=>{
        expect(emailRegex.test("abc@gmail.com")).toBe(true)
    })
    
    it("abc@xy.co.in must be valid", ()=>{
        expect(emailRegex.test("abc@gmail.co.in")).toBe(true)
    })

    it("abc@gmail. must be invalid", ()=>{
        expect(emailRegex.test("abc@gmail.")).toBe(false)
    })

    it("@gmail.com must be invalid", ()=>{
        expect(emailRegex.test("@gmail.com")).toBe(false)
    })

    it("@gmail must be invalid", ()=>{
        expect(emailRegex.test("@gmail")).toBe(false)
    })
})

describe("check login password is valid",()=>{
    it("abdh27 must be valid", ()=>{
        expect(("abdh27").length < 6).toBe(false)
    })

    it("u@gmail1 must be valid", ()=>{
        expect(("u@gmail1").length < 6).toBe(false)
    })

    it("il1 must be invalid", ()=>{
        expect(("il1").length < 6).toBe(true)
    })
})

describe("check login reducer functions", ()=>{
    let initialState:LoginUserState, state:LoginUserState;
    beforeEach(()=>{
    initialState = {
        isUserLoggedIn: false,
        user: {
            name: "",
            email:"",
            token:"",
            },
        error: ""
    }
    state = {
        isUserLoggedIn: true,
        user: {
            name: "eve.holt@gmail.com",
            email:"eve.holt@gmail.com",
            token:"djiu9i9e8onj",
            },
        error: ""
    }
    }
    )

    it("SET_USER with payload must update the user of initial state",()=>{
        let payload = {
            name: "",
            email: "abc@gmail.com",
            token: "89hdv7y7893vb"
        }
        let updatedState = {...state, user:{...payload}, isUserLoggedIn: true }
        expect(loginReducer(initialState, { type: "SET_USER", payload })).toEqual(updatedState);
    })

    it("CLEAR_USER must return initial empty state",()=>{
        expect(loginReducer(state, { type: "CLEAR_USER" })).toEqual(initialState);
    })

    it("LOGIN_ERROR with must update the error field of initial state",()=>{
        let payload = {
            error: "Error: some error message "
        }
        let updatedState = {...initialState, ...payload}
        expect(loginReducer(state, { type: "LOGIN_ERROR", payload })).toEqual(updatedState);
    })

    it("LOGOUT must return initial state", ()=>{
        expect(loginReducer(state, {type: "LOGOUT"})).toEqual(initialState)
    })

})

describe("check login watcher saga",()=>{
    let watcherItr=watcherLoginSaga();
    beforeAll(()=>{
        watcherItr = watcherLoginSaga();
    })

    it("must call worker saga after LOGIN_USER action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(LoginReducerActionsType.LOGIN_USER, workerLoginSaga))
    })

    it("must call worker saga after CLEAR_USER action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(LoginReducerActionsType.CLEAR_USER, workerLogoutSaga))
    })
})

describe("check login worker saga",()=>{
    it("check login worker saga without any errors",()=>{
        let action:loginUserActionType={
            type:"LOGIN_USER",
            payload: {
                email: "eve@gmail.com",
                password: "pistol"
            }
        }
    
        let workerItr = workerLoginSaga(action)
        let callLoginResponse = workerItr.next().value
        expect(callLoginResponse).toEqual(call(login, action.payload)) 
        let res={
            token: "sdjsuyu83"
        }
        let payload = {
            email: action.payload.email,
            token: res.token
        }
        let response = workerItr.next(payload).value
        expect(response).toEqual(put(setUserAction(payload)))
        expect(workerItr.next().done).toBeTruthy()
    })  

    it("login worker saga with errors must set error to reducer",()=>{
        let action:loginUserActionType={
            type:"LOGIN_USER",
            payload: {
                email: "eve@gmail.com",
                password: "pistol"
            }
        }
    
        let workerItr = workerLoginSaga(action)
        expect(workerItr.next().value).toEqual(call(login, action.payload))
        let err:LoginErrorType={
            error: "error"
        }
        expect(workerItr.throw("error").value).toEqual(put(setLoginError(err)))
        expect(workerItr.next().done).toBeTruthy()
    })  
})

describe("check logout worker saga",()=>{
    it("check logout worker saga without any errors",()=>{
        let workerItr = workerLogoutSaga()
        expect(workerItr.next().value).toEqual(put(clearCartAction()))
        
        expect(workerItr.next().value).toEqual(put(logoutUserAction()))
        expect(workerItr.next().done).toBeTruthy()
    })  

    it("login worker saga with errors must set error to reducer",()=>{
        let action:loginUserActionType={
            type:"LOGIN_USER",
            payload: {
                email: "eve@gmail.com",
                password: "pistol"
            }
        }
    
        let workerItr = workerLoginSaga(action)
        expect(workerItr.next().value).toEqual(call(login, action.payload))
        let err:LoginErrorType={
            error: "error"
        }
        expect(workerItr.throw("error").value).toEqual(put(setLoginError(err)))
        expect(workerItr.next().done).toBeTruthy()
    })  
})

describe('check login form render', () => {
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                    {/* <Route path="/login" element={<LoginForm/>}/> */}
                    <LoginForm/>
                </BrowserRouter>
            </Provider>
        );
    })

    test("renders empty LoginForm",()=>{
        expect(screen.getByText("Email:")).toBeInTheDocument(); 
        expect(screen.getByText("Password:")).toBeInTheDocument();
        const inputEmail = screen.getByRole('email-input')
        expect(inputEmail).toHaveValue("")
        const inputPassword = screen.getByRole('password-input')
        expect(inputPassword).toHaveValue("")
        expect(screen.getByRole("submit-form")).toBeInTheDocument();
    })

    test("renders error for invalid email in LoginForm and submit button is disabled",()=>{
        expect(screen.getByRole('email-input')).toHaveValue("")
        expect(screen.getByRole('password-input')).toHaveValue("")
        fireEvent.change(screen.getByRole('email-input'), {
            target: { value: 'eve.holt@re' },
        });
        expect(screen.getByRole("submit-form")).toBeDisabled();
    })

    test("renders error for invalid password in LoginForm and submit button is disabled",()=>{
        expect(screen.getByRole('email-input')).toHaveValue("")
        expect(screen.getByRole('password-input')).toHaveValue("")
        fireEvent.change(screen.getByRole('password-input'), {
            target: { value: 'citys' },
        });
        expect(screen.getByText("Password should be greater than 6 characters")).toBeInTheDocument()
        expect(screen.getByRole("submit-form")).toBeDisabled();
    })

  test('must render error on wrong credentials sent to login api', async () => {
        fireEvent.change(screen.getByRole('email-input'), {
            target: { value: 'eve.holt@gmail.con' },
        });
        fireEvent.change(screen.getByRole('password-input'), {
            target: { value: 'citysi' },
        });
        fireEvent.click(screen.getByRole('submit-form'))
        // put(setLoginError({error: "user not found"}))
        expect(await screen.findByText("user not found")).toBeInTheDocument()
    });
});