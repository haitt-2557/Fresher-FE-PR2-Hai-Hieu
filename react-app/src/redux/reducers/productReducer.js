/** @format */

import {
	GET_PRODUCT_HOME_FAIL,
	GET_PRODUCT_HOME_SUCCESS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_TOTAL_PRODUCTS_SUCCESS,
	GET_TOTAL_PRODUCTS_FAIL,
	CHANGE_PAGE,
} from '../constants';

const initialState = {
	params: { },
	productHome: { },
	productsData: [],
	totalProduct: [],
	pagination: {
		currentPage: 1,
		total: 1,
		limit: 9,
	},
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
				productsData: [...action.payload.product],
				params: action.payload.params,
				pagination: {
					...state.pagination,
					total: action.payload.total,
				},
			};
		case GET_PRODUCTS_FAIL: {
			return state;
		}
		case GET_TOTAL_PRODUCTS_SUCCESS:
			return {
				...state,
				totalProduct: [...action.payload],
				pagination: {
					...state.pagination,
					total: action.payload.length,
				},
			};
		case GET_TOTAL_PRODUCTS_FAIL: {
			return state;
		}
		// case CHANGE_PAGE: {
		// 	return {
		// 		...state,
		// 		productsData: action.payload.product,
		// 		pagination: {
		// 			...state.pagination,
		// 			currentPage: action.payload.currentPage,
		// 			limit: action.payload.limit,
		// 		},
		// 	};
		// }

		default:
			return state;
	}
}
