/** @format */

import { put, takeEvery, take, takeLatest, takeLeading } from 'redux-saga/effects';
import * as API from '../../api/index';
import { toast } from 'react-toastify';
import { Types } from '../constants/auth.constant';

function* loginSaga(action) {
	try {
		const { email, password } = action.payload;
		const res = yield API.signIn({ email: email, password: password });
		console.log(res);
		if (res.data.user.role === 'admin') {
			action.history.push('/admin');
		}
		yield put({
			type: Types.LOGIN,
			payload: res.data,
		});
		action.history.push('/');
	} catch (error) {
		toast.error(error.response.data, {
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
	console.log(action);

	yield put({
		type: Types.LOGIN_GOOGLE,
		payload: action.payload,
	});
	action.history.push('/');
}

function* authSaga() {
	yield takeLeading(Types.LOGIN, loginSaga);
	yield takeLeading(Types.SIGNUP, signupSaga);
	yield takeLeading(Types.LOGIN_GOOGLE, loginGoogle);
}

export default authSaga;
