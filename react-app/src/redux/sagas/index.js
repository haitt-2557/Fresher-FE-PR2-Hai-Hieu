/** @format */

import { fork } from '@redux-saga/core/effects';
import productSaga from './product.saga';
import categorySaga from './category.saga';
import productDetailSaga from './productDetail.saga';
import authSaga from './authSaga';

export default function* mySaga() {
    yield fork(productSaga);
    yield fork(authSaga);
    yield fork(productDetailSaga);
    yield fork(categorySaga);
}
