/** @format */

import {
	CREATE_ACCOUNT_SUCCESS,
	CREATE_ACCOUNT_FAIL,
	GET_USER_ACCOUNT_SUCCESS,
	GET_USER_ACCOUNT_FAIL,
	GET_INFO_FAIL,
	GET_INFO_SUCCESS,
} from '../constants';

const initialStore = {
	userList: [],
	user: {},
	infoUser: {},
};

export default function accountReducer(state = initialStore, action) {
	switch (action.type) {
		case CREATE_ACCOUNT_SUCCESS:
			return {
				...state,
				userList: [action.payload],
			};
		case CREATE_ACCOUNT_FAIL: {
			return state;
		}
		case GET_USER_ACCOUNT_SUCCESS: {
			return {
				...state,
				user: {
					...action.payload,
				},
			};
		}
		case GET_USER_ACCOUNT_FAIL: {
			return state;
		}
		case GET_INFO_SUCCESS: {
			return {
				...state,
				infoUser: {
					...action.payload,
				},
			};
		}
		case GET_INFO_FAIL: {
			return state;
		}
		default: {
			return state;
		}
	}
}
