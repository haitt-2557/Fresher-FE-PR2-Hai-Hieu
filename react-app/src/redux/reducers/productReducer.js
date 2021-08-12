/** @format */

import {
	GET_PRODUCT_HOME_FAIL,
	GET_PRODUCT_HOME_SUCCESS,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	GET_TOTAL_PRODUCTS_SUCCESS,
	GET_TOTAL_PRODUCTS_FAIL,
	CHANGE_PAGE,
	CREATE_PRODUCTS_SUCCESS,
	CREATE_PRODUCTS_FAIL,
	UPDATE_PRODUCTS_SUCCESS,
	UPDATE_PRODUCTS_FAIL,
	DELETE_PRODUCTS_SUCCESS,
	DELETE_PRODUCTS_FAIL,
} from '../constants';

const initialState = {
	params: {},
	productHome: {},
	productsData: [],
	totalProduct: [],
	pagination: {
		currentPage: 1,
		total: 1,
		limit: 9,
	},
	addProduct: {},
	updateProduct: {},
	deleteProduct: {},
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

		case CREATE_PRODUCTS_SUCCESS:
			return {
				...state,
				addProduct: { ...action.payload },
			};
		case CREATE_PRODUCTS_FAIL: {
			return state;
		}
		case UPDATE_PRODUCTS_SUCCESS:
			const index = state.productsData.findIndex((product) => product.id === action.payload.id);
			state.productsData.fill(action.payload, index, index + 1);
			return {
				...state,
			};
		case UPDATE_PRODUCTS_FAIL: {
			return state;
		}

		case DELETE_PRODUCTS_SUCCESS:
			return {
				...state,
				deleteProduct: { ...action.payload },
			};

		case DELETE_PRODUCTS_FAIL: {
			return state;
		}

		default:
			return state;
	}
}
