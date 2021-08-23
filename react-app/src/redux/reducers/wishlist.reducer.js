/** @format */

import { Types } from '../constants/wishlist.constant';
const wishlist = JSON.parse(localStorage.getItem('wishlist'));
const wishState = {
	numberWishList: wishlist ? wishlist.length : 0,
	wishList: wishlist ? wishlist : [],
};
export const wishListReducer = (state = wishState, action) => {
	switch (action.type) {
		case Types.ADD_WISH_LIST_SUCCESS: {
			state = {
				numberWishList: action.payload.length,
				wishList: action.payload,
			};
			localStorage.setItem('wishlist', JSON.stringify(state.wishList));
			return { ...state };
		}
		case Types.REMOVE_WISH_LIST_SUCCESS: {
			state = {
				...state,
				numberWishList: action.payload.length,
				wishList: action.payload,
			};
			localStorage.setItem('wishlist', JSON.stringify(state.wishList));
			return { ...state };
		}
		default: {
			return state;
		}
	}
};
