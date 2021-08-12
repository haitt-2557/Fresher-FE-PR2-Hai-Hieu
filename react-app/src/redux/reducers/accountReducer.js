/** @format */

import { GET_USER_ACCOUNT_SUCCESS, GET_USER_ACCOUNT_FAIL, GET_INFO_FAIL, GET_INFO_SUCCESS, DELETE_USER_SUCCESS } from '../constants';
import moment from 'moment';
const initialStore = {
	user: {},
	userDataEdited: {},
	infoUser: {},
};

export default function accountReducer(state = initialStore, action) {
	switch (action.type) {
		case GET_USER_ACCOUNT_SUCCESS: {
			const user = action.payload.map((item) => {
				return {
					...item,
					name: item.name ? item.name : item.firstname + ' ' + item.lastname,
					birthday: item.birthday ? moment(item.birthday).format('DD/MM/YYYY') : '',
				};
			}, []);
			return {
				...state,
				user: user,
			};
		}
		case DELETE_USER_SUCCESS: {
			const newUser = state.user.filter((user) => user.id !== action.payload);
			return {
				...state,
				user: newUser,
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
