import { call,put, all, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { SignUpReducerActionsType, SignUpResponseType, signUpUserActionType } from "../types/signup.types";
import { signup } from "../services/signup.service";
import { setSignUpError, setUserAction } from "../actions/signup.actions";


export function* workerSignUpSaga(action:signUpUserActionType){
    try{
        console.log("in the worker signup saga ");
        console.log(action);
        // yield put(setIsLoadingAction(true))
        const response:SignUpResponseType = yield call(signup, action.payload)
        console.log("resp", response)
        yield put(setUserAction({email: action.payload.email,...response}))
        // yield put(setIsLoadingAction(false))
    }catch(err){
        yield put(setSignUpError({error:err as string}))
        console.log(err)
    }
}

export function* watcherSignUpSaga(){
    console.log("watcher signup saga" )
    yield takeEvery(SignUpReducerActionsType.SIGN_UP_USER, workerSignUpSaga)
}