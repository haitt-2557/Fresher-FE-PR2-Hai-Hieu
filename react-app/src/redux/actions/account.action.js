/** @format */

import { GET_USER_ACCOUNT, GET_INFO, EDIT_PROFILE } from '../constants';

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
