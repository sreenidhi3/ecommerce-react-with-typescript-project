import LoginForm from "../components/LoginForm";
import { getByText, screen, getByLabelText, render, fireEvent } from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import {takeEvery, call, put} from "redux-saga/effects"
import { watcherLoginSaga, workerLoginSaga, workerLogoutSaga} from "../sagas/login.saga";
import { Provider } from "react-redux";
import App from "../App";
import {signup} from "../services/signup.service"
import { clearCartAction } from "../actions/products.actions";
import { SignUpErrorType, SignUpReducerActionsType, SignUpReducerActionType, SignUpRequestType, signUpUserActionType, SignUpUserState } from "../types/signup.types";
import { signUpReducer } from "../reducers/signup.reducers";
import { setSignUpError, setUserAction, signUpUserAction } from "../actions/signup.actions";
import { watcherSignUpSaga ,workerSignUpSaga} from "../sagas/signup.saga";
import store from "../store";
import SignUp from "../components/SignUp";

describe("check signup reducer functions", ()=>{
    let initialState:SignUpUserState, state:SignUpUserState;
    beforeEach(()=>{
    initialState = {
        isUserSignedUp: false,
        user: {
            id: null,
            email:"",
            token:"",
            },
        error: ""
    }
    state = {
        isUserSignedUp: true,
        user: {
            id: 4,
            email:"eve.holt@reqres.in",
            token:"QpwL5tke4Pnpja7X4",
            },
        error: ""
    }
    })

    it("SET_USER with payload must update the user of initial state",()=>{
        let payload = {
            id: 4,
            email: "eve.holt@reqres.in",
            token: "QpwL5tke4Pnpja7X4"
        }
        let updatedState = {...state }
        expect(setUserAction(payload)).toEqual({type: "SET_USER", payload});
        expect(signUpReducer(initialState, { type: "SET_USER", payload })).toEqual(updatedState);
    })

    it("SIGN_UP_ERROR with payload must update the error field of initial state",()=>{
        let payload = {
            error: "Error: some error message "
        }
        let updatedState = {...initialState, ...payload}
        expect(signUpReducer(state, { type: "SIGN_UP_ERROR", payload })).toEqual(updatedState);
    })
})

describe("check sign up watcher saga",()=>{
    let watcherItr=watcherSignUpSaga();
    beforeAll(()=>{
        watcherItr = watcherSignUpSaga();
    })

    it("must call worker saga after SIGN_UP_USER action dispatched",()=>{
        const takeEveryWatcher = watcherItr.next().value
        expect(takeEveryWatcher).toEqual(takeEvery(SignUpReducerActionsType.SIGN_UP_USER, workerSignUpSaga))
    })
})

describe("check sign up worker saga",()=>{
    it("check sign up worker saga without any errors", async()=>{
        let action:signUpUserActionType={
            type:"SIGN_UP_USER",
            payload: {
                email: "eve@gmail.com",
                password: "pistol"
            }
        }
    
        let workerItr = workerSignUpSaga(action)
        let callSignUpResponse = workerItr.next().value
        expect(callSignUpResponse).toEqual(call(signup, action.payload)) 
        let res={
            id:4,
            token: "QpwL5tke4Pnpja7X4"
        }
        let payload = {
                id:4,
                email: action.payload.email,
                token: res.token
            }
        let resp = workerItr.next(payload).value;
        expect(resp).toEqual(put(setUserAction(payload)))
        expect(workerItr.next().done).toBeTruthy()
    })  

    it("sign up worker saga with errors must set error to reducer",()=>{
        let action:signUpUserActionType={
            type:"SIGN_UP_USER",
            payload: {
                email: "eve.holt@reqres.in",
                password: "pistol"
            }
        }
        let workerItr = workerSignUpSaga(action)
        expect(workerItr.next().value).toEqual(call(signup, action.payload))
        let err:SignUpErrorType={
            error: "error"
        }
        expect(workerItr.throw("error").value).toEqual(put(setSignUpError(err)))
        expect(workerItr.next().done).toBeTruthy()
    })  
})


describe('check sign up form render', () => {
    beforeEach(()=>{
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <SignUp/>
                </BrowserRouter>
            </Provider>
        );
    })

    test("renders empty Sign Up Form",()=>{
        expect(screen.getByText("Email:")).toBeInTheDocument(); 
        expect(screen.getByText("Password:")).toBeInTheDocument();
        const inputEmail = screen.getByRole('email-input')
        expect(inputEmail).toHaveValue("")
        const inputPassword = screen.getByRole('password-input')
        expect(inputPassword).toHaveValue("")
        expect(screen.getByRole("submit-form")).toBeInTheDocument();
    })

    test("renders error for invalid email in Sign Up Form and submit button is disabled",async()=>{
        expect(screen.getByRole('email-input')).toHaveValue("")
        expect(screen.getByRole('password-input')).toHaveValue("")
        fireEvent.change(screen.getByRole('email-input'), {
            target: { value: 'eve.holt@re' },
        });
        expect(await screen.findByText("Enter a valid email")).toBeInTheDocument()
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

  test('must render error on wrong credentials sent to sign up api', async() => {
        fireEvent.change(screen.getByRole('email-input'), {
            target: { value: 'eve.holt@gmail.con' },
        });
        fireEvent.change(screen.getByRole('password-input'), {
            target: { value: 'pistol' },
        });
        fireEvent.click(screen.getByRole('submit-form'))
        expect(await screen.findByText("Note: Only defined users succeed registration")).toBeInTheDocument()
    });
});