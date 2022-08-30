import { call, all, takeEvery, takeLatest, fork } from "redux-saga/effects"
import { watcherLoginSaga } from "./login.saga";
import { watcherSignUpSaga } from "./signup.saga";
import { watcherProductsSaga } from "./products.saga";
export function* rootSaga() {
    console.log("in the root saga ");
    yield all([call(watcherLoginSaga), call(watcherSignUpSaga), call(watcherProductsSaga)])
}