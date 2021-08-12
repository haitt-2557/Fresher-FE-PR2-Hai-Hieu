/** @format */

import { GET_USER_ACCOUNT, GET_INFO, EDIT_PROFILE, DELETE_USER, CHANGE_ROLE } from '../constants';

export function getUser(params) {
	return {
		type: GET_USER_ACCOUNT,
		payload: params,
	};
}
export function getInfo(params) {
	return {
		type: GET_INFO,
		payload: params,
	};
}

export function editProfile(params) {
	return {
		type: EDIT_PROFILE,
		payload: params,
	};
}
export const deleteUser = (params) => {
	return {
		type: DELETE_USER,
		payload: params,
	};
};
export const changeRole = (params) => {
	return {
		type: CHANGE_ROLE,
		payload: params,
	};
};
