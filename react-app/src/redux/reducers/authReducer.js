/** @format */

import { Types } from '../constants/auth.constant';
const profile = JSON.parse(localStorage.getItem('profile'));
const authState = {
	authData: profile ? profile : null,
};
export const authReducer = (state = authState, action) => {
	switch (action.type) {
		case Types.LOGIN:
			localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
			return {
				...state,
				authData: action.payload,
				loading: false,
			};
		case Types.LOGIN_GOOGLE:
			localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
			return {
				...state,
				authData: action.payload,
				loading: false,
			};
		case Types.SIGNUP:
			localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
			return {
				...state,
				authData: action.payload,
				loading: false,
			};

		case Types.LOGOUT:
			localStorage.removeItem('profile');
			return { ...state, authData: null, loading: false };

		case Types.UPDATE_PROFILE: {
			state = {
				...state,
				authData: { ...state.authData, user: { ...state.authData.user, ...action.payload } },
			};
			localStorage.setItem('profile', JSON.stringify({ ...state.authData }));
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
