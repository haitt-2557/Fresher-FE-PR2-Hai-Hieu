/** @format */

import { put, takeEvery, takeLeading } from 'redux-saga/effects';
import * as API from '../../api/index';
import { toast } from 'react-toastify';
import { Types } from '../constants/auth.constant';
import { Redirect } from 'react-router';
const user = JSON.parse(localStorage.getItem('profile'));
function* loginSaga(action) {
	try {
		const { email, password } = action.payload;
		const res = yield API.signIn({ email: email, password: password });

		yield put({
			type: Types.LOGIN,
			payload: res.data,
		});

		if (!res.data.user.name) {
			toast.success(`Welcome ${res.data.user.firstname + ' ' + res.data.user.lastname}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		} else {
			toast.success(`Welcome ${res.data.user.name}`, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}

		if (res.data.user.role === 'admin') {
			action.history.push('/admin');
		} else {
			action.history.push('/');
		}
	} catch (error) {
		toast.error(error?.response?.data, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
}

function* signupSaga(action) {
	console.log(action.payload);
	try {
		const { email, password, firstname, lastname } = action.payload;
		const res = yield API.signUp({
			email,
			password,
			firstname: firstname,
			lastname: lastname,
			role: 'user',
		});
		yield put({
			type: Types.SIGNUP,
			payload: res.data,
		});
		action.history.push('/login');
		toast.success('Create account successful', {
			position: toast.POSITION.TOP_RIGHT,
		});
	} catch (error) {
		toast.error(error?.response?.data, {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
}
function* loginGoogle(action) {
	yield put({
		type: Types.LOGIN_GOOGLE,
		payload: action.payload,
	});
	action.history.push('/');
	toast.success(`Welcome ${action.payload.user.name}`, {
		position: toast.POSITION.TOP_RIGHT,
	});
}
function* updateProfile(action) {
	try {
		const { email, password, firstname, lastname, address, birthday, imageUrl, phone } = action.payload;
		const { data } = yield API.updateProfile(
			{
				firstname: firstname,
				lastname: lastname,
				email: email,
				phone: phone,
				address: address,
				birthday: birthday?._d,
				imageUrl: imageUrl,
				password: password,
			},
			user?.user?.id,
		);
		yield put({
			type: Types.UPDATE_PROFILE,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
}
function* authSaga() {
	yield takeLeading(Types.LOGIN, loginSaga);
	yield takeLeading(Types.SIGNUP, signupSaga);
	yield takeLeading(Types.LOGIN_GOOGLE, loginGoogle);
	yield takeLeading(Types.UPDATE_PROFILE, updateProfile);
}

export default authSaga;
