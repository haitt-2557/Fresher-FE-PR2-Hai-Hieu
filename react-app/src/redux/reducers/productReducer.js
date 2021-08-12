/** @format */

import {
	GET_PRODUCT_HOME_FAIL,
	GET_PRODUCT_HOME_SUCCESS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_TOTAL_PRODUCTS_SUCCESS,
	GET_TOTAL_PRODUCTS_FAIL,
} from '../constants';

const initialState = {
	productHome: {},
	productsData: [],
	totalProduct: [],
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCT_HOME_SUCCESS:
			return {
				...state,
				productHome: { ...action.payload },
			};
		case GET_PRODUCT_HOME_FAIL: {
			return state;
		}
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				productsData: [...action.payload],
			};
		case GET_PRODUCTS_FAIL: {
			return state;
		}
		case GET_TOTAL_PRODUCTS_SUCCESS:
			return {
				...state,
				totalProduct: [...action.payload],
			};
		case GET_TOTAL_PRODUCTS_FAIL: {
			return state;
		}
		default:
			return state;
	}
}
