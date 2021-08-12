import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {
    EDIT_PROFILE,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    GET_INFO,
    GET_INFO_FAIL,
    GET_INFO_SUCCESS,
} from "../constants";

const apiURL = 'http://localhost:4000';

function* getInfoSaga(action) {
    try {
        const { email } = action.payload;
        const response = yield axios.get(`${apiURL}/users?email=${email}`);
        const data = response.data[0];
        yield put({
            type: GET_INFO_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: GET_INFO_FAIL,
            payload: error,
        });
    }
}

function* editProfileSaga(action) {
    try {
        const { id, firstname, lastname, password, token } = action.payload;
        const response = yield axios.patch(`${apiURL}/users/${id}`, {
            firstname,
            lastname,
            password,
        });
        const data = response.data;

        yield put({
            type: EDIT_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        yield put({
            type: EDIT_PROFILE_FAIL,
            payload: error,
        });
    }
}

export default function* accountSaga() {
    yield takeEvery(EDIT_PROFILE, editProfileSaga);
    yield takeEvery(GET_INFO, getInfoSaga);
}
