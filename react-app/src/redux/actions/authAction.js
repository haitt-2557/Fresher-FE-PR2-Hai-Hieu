/** @format */

import { Types } from '../constants/auth.constant';

export const login = (form, history) => {
	return {
		type: Types.LOGIN,
		payload: form,
		history,
	};
};

export const signup = (form, history) => {
	return {
		type: Types.SIGNUP,
		payload: form,
		history,
	};
};
export const login_google = (form, history) => {
	return {
		type: Types.LOGIN_GOOGLE,
		payload: form,
		history,
	};
};
export const updateProfile = (form) => {
	return {
		type: Types.UPDATE_PROFILE,
		payload: form,
	};
};
