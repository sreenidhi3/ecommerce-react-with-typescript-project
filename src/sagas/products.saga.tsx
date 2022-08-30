import { call,put, all, takeEvery, takeLatest, fork } from "redux-saga/effects";
import { addToCartActionAType, checkoutActionType, fetchCategoriesActionType, fetchProductsActionType, ProductsReducerActionsType, ProductType, removeFromCartActionAType, singleCategoryType } from "../types/products.types";
import { signup } from "../services/signup.service";
import { setSignUpError, setUserAction } from "../actions/signup.actions";
import { fetchAllCategories, fetchAllProducts } from "../services/products.service";
import { addToCartAction, clearCartAction, removeFromCartAction, setCategoriesAction, setProductsAction } from "../actions/products.actions";


export function* workerProductsFetchSaga(action:fetchProductsActionType){
    try{
        console.log("in the worker product fetch saga ");
        console.log(action);
        // yield put(setIsLoadingAction(true))
        const response:ProductType[] = yield call(fetchAllProducts)
        console.log("resp", response)
        yield put(setProductsAction(response))
        // yield put(setIsLoadingAction(false))
    }catch(err){
        yield err
        console.log(err)
    }
}

export function* workerCategoriesFetchSaga(action:fetchCategoriesActionType){
    try{
        console.log("in the worker categories fetch saga ");
        console.log(action);
        // yield put(setIsLoadingAction(true))
        const response:singleCategoryType[] = yield call(fetchAllCategories)
        console.log("resp", response)
        yield put(setCategoriesAction(response))
        // yield put(setIsLoadingAction(false))
    }catch(err){
        console.log(err)
    }
}

export function* workerAddToCartSaga(action:addToCartActionAType){
    try{
        console.log("in the worker add to cart saga ");
        console.log(action);
        yield put(addToCartAction(action.payload))
        // localStorage.setItem("cart", JSON.stringify({cart:}))
        // yield put(setIsLoadingAction(false))
    }catch(err){
        console.log(err)
    }
}

export function* workerRemoveFromCartSaga(action:removeFromCartActionAType){
    try{
        console.log("in the worker remove from cart saga ");
        console.log(action);
        yield put(removeFromCartAction(action.payload))
        // yield put(setIsLoadingAction(false))
    }catch(err){
        console.log(err)
    }
}

export function* workerCheckoutSaga(action:checkoutActionType){
    try{
        console.log("in the worker checkout saga ");
        console.log(action);
        localStorage.removeItem("cart")
        yield put(clearCartAction())
    }catch(err){
        console.log(err)
    }
}


export function* watcherProductsSaga(){
    console.log("watcher products saga" )
    yield takeEvery(ProductsReducerActionsType.FETCH_PRODUCTS, workerProductsFetchSaga)
    yield takeEvery(ProductsReducerActionsType.FETCH_CATEGORIES, workerCategoriesFetchSaga)
    yield takeEvery(ProductsReducerActionsType.ADD_TO_CART_A, workerAddToCartSaga)
    yield takeEvery(ProductsReducerActionsType.REMOVE_FROM_CART_A, workerRemoveFromCartSaga)
    yield takeEvery(ProductsReducerActionsType.CHECKOUT, workerCheckoutSaga)
}
