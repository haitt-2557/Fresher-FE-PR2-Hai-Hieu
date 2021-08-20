/** @format */

import { put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';

import { GET_CATEGORY, GET_CATEGORY_FAIL, GET_CATEGORY_SUCCESS, GET_SIDEBAR, GET_SIDEBAR_FAIL, GET_SIDEBAR_SUCCESS } from '../constants';

const apiURL = 'http://localhost:4000';

function* getCategorySaga() {
	try {
		const response = yield axios({
			method: 'GET',
			url: `${apiURL}/Category`,
		});

		const data = response.data;

		yield put({
			type: GET_CATEGORY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		yield put({
			type: GET_CATEGORY_FAIL,
			payload: error,
		});
	}
}

function* getSidebarSaga() {
	try {
		const responseCategory = yield axios({
			method: 'GET',
			url: `${apiURL}/Category`,
		});
		const responseTags = yield axios({
			method: 'GET',
			url: `${apiURL}/tags`,
		});

		const data = {
			categoryData: responseCategory.data,
			tagsData: responseTags.data,
		};

		yield put({
			type: GET_SIDEBAR_SUCCESS,
			payload: data,
		});
	} catch (error) {
		yield put({
			type: GET_SIDEBAR_FAIL,
			payload: error,
		});
	}
}
export default function* categorySaga() {
	yield takeEvery(GET_CATEGORY, getCategorySaga);
	yield takeEvery(GET_SIDEBAR, getSidebarSaga);
}
