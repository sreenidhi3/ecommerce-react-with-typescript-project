import { applyMiddleware, combineReducers, configureStore, legacy_createStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { loginReducer } from "./reducers/login.reducers";
import { productReducer } from "./reducers/product.reducers";
import { signUpReducer } from "./reducers/signup.reducers";

import { rootSaga } from './sagas/root.saga'
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({loginReducer, signUpReducer, productReducer});
export const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware));
console.log(store)
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof rootReducer>;
export default store;

