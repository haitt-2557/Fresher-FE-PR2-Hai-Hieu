/** @format */

import { Types } from '../constants/wishlist.constant';

const wishState = {
	numberWishList: 0,
	wishList: [],
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
