import { fork } from '@redux-saga/core/effects';
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import authSaga from './authSaga';

export default function* mySaga() {
    yield fork(productSaga);
    yield fork(authSaga);
    yield fork(categorySaga);
}
