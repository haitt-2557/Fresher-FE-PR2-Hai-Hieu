/** @format */

import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' });
API.interceptors.request.use((req) => {
	if (localStorage.getItem('profile')) {
		req.headers.authorization = 'Bearer ' + JSON.parse(localStorage.getItem('profile')).access_token;
	}

	return req;
});
export const signIn = (form) => API.post('/login', form);
export const signUp = (form) => API.post('/register', form);
export const addWish = (item, id) => API.patch(`/users/${id}`, item);
export const removeWish = (item, id) => API.patch(`/users/${id}`, item);
export const updateProfile = (form, id) => API.patch(`/users/${id}`, form);
export const getUserInfo = (id) => API.get(`/users/${id}`);
export const getUser = () => API.get('/users');
