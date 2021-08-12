/** @format */

import { toast } from 'react-toastify';
import { Types } from '../constants/wishlist.constant';
import * as API from '../../api/index';
import { put, takeEvery } from 'redux-saga/effects';

const userInfo = JSON.parse(localStorage.getItem('profile'));
let wishlist = JSON.parse(localStorage.getItem('wishlist')) ? JSON.parse(localStorage.getItem('wishlist')) : [];
function* addToWishList(action) {
	let isExist = false;
	const product = action.payload;

	const newProduct = { id: product.id, name: product.name, img: product.img, price: product.newPrice };

	try {
		wishlist.forEach((item) => {
			if (item.id === action.payload.id) {
				toast.warn('The product already exists in the wishlist', {
					position: toast.POSITION.TOP_RIGHT,
				});
				isExist = true;
			}
		});
		if (!isExist) {
			toast.success('Successfully added product to wishlist', {
				position: toast.POSITION.TOP_RIGHT,
			});
			wishlist.push(newProduct);
			if (userInfo.user.id) {
				const res = yield API.addWish({ wishlist: wishlist }, userInfo.user.id);
				yield put({
					type: Types.ADD_WISH_LIST_SUCCESS,
					payload: res.data.wishlist,
				});
			} else {
				yield put({
					type: Types.ADD_WISH_LIST_SUCCESS,
					payload: wishlist,
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
}
function* removeWishList(action) {
	try {
		const index = wishlist.findIndex((item) => item.id === action.payload.id);
		wishlist.splice(index, 1);
		if (userInfo.user.id) {
			const res = yield API.removeWish({ wishlist: wishlist }, userInfo.user.id);
			yield put({
				type: Types.REMOVE_WISH_LIST_SUCCESS,
				payload: res.data.wishlist,
			});
		} else {
			yield put({
				type: Types.REMOVE_WISH_LIST_SUCCESS,
				payload: wishlist,
			});
		}
	} catch (error) {
		console.log(error);
	}
}

export default function* wishList() {
	yield takeEvery(Types.ADD_WISH_LIST, addToWishList);
	yield takeEvery(Types.REMOVE_WISH_LIST, removeWishList);
}
