/** @format */
import { Types } from '../constants/wishlist.constant';
export const addWish = (item) => {
	return {
		type: Types.ADD_WISH_LIST,
		payload: item,
	};
};
export const deleteWish = (item) => {
	return {
		type: Types.REMOVE_WISH_LIST,
		payload: item,
	};
};
