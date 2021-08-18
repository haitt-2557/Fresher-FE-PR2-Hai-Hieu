/** @format */

import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';

import {
    GET_PRODUCT_HOME,
    GET_PRODUCT_HOME_FAIL,
    GET_PRODUCT_HOME_SUCCESS,
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_TOTAL_PRODUCTS,
    GET_TOTAL_PRODUCTS_SUCCESS,
    GET_TOTAL_PRODUCTS_FAIL,
} from '../constants';

const apiURL = 'http://localhost:4000';

function* getProductHomeSaga(action) {
    try {
        const responseNew = yield axios({
            method: 'GET',
            url: `${apiURL}/products?new=true`,
        });
        const responseSale = yield axios({
            method: 'GET',
            url: `${apiURL}/products?oldPrice_gte=1`,
        });
        const responseSpecial = yield axios({
            method: 'GET',
            url: `${apiURL}/products?rate_gte=4`,
        });
        const data = {
            new: responseNew.data,
            sale: responseSale.data,
            special: responseSpecial.data,
        };

        yield put({
            type: GET_PRODUCT_HOME_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCT_HOME_FAIL,
            payload: error,
        });
    }
}

function* getProductSaga(action) {
    try {
        const { page, limit, category, price, tag, sort } = action.payload;
        const response = yield axios({
            method: 'GET',
            url: `${apiURL}/products`,
            params: {
                ...(page && { _page: page }),
                ...(limit && { _limit: limit }),
                ...(category && { categoryId: category }),
                ...(price && { newPrice_gte: price[0], newPrice_lte: price[1] }),
                ...(tag && { tagId: tag }),
                ...(sort === 'bestSelling' && { oldPrice_gte: 0 }),
                ...(sort === 'priceLowToHigh' && { _sort: 'newPrice', _order: 'asc' }),
                ...(sort === 'priceHighToLow' && { _sort: 'newPrice', _order: 'desc' }),
                ...(sort === 'date' && { news: true }),
            },
        });
        const data = response.data;

        yield put({
            type: GET_PRODUCTS_SUCCESS,
            payload: { product: data, params: action.payload },
        });
    } catch (error) {
        yield put({
            type: GET_PRODUCTS_FAIL,
            payload: error,
        });
    }
}

function* getTotalProductSaga(action) {
    try {
        const { category, price, tag, sort } = action.payload;

        const response = yield axios({
            method: 'GET',
            url: `${apiURL}/products`,
            params: {
                ...(category && { categoryId: category }),
                ...(price && { newPrice_gte: price[0], newPrice_lte: price[1] }),
                ...(tag && { tagId: tag }),
                ...(sort === 'bestSelling' && { oldPrice_gte: 0 }),
                ...(sort === 'priceLowToHigh' && { _sort: 'newPrice', _order: 'asc' }),
                ...(sort === 'priceHighToLow' && { _sort: 'newPrice', _order: 'desc' }),
                ...(sort === 'date' && { news: true }),
            },
        });
        const data = response.data;
        yield put({
            type: GET_TOTAL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_TOTAL_PRODUCTS_FAIL,
            payload: error,
        });
    }
}
export default function* productSaga() {
    yield takeEvery(GET_PRODUCT_HOME, getProductHomeSaga);
    yield takeEvery(GET_PRODUCTS, getProductSaga);
    yield takeEvery(GET_TOTAL_PRODUCTS, getTotalProductSaga);
}
