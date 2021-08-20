/** @format */

import Types from '../constants/cart.constant';

export default function addToCart(product, quantity) {
	return {
		type: Types.ADD_TO_CART,
		payload: {
			...product,
			quantity: quantity ? quantity : 1,
		},
	};
}
export function updateCart(type, item) {
	return {
		type: Types.UPDATE_QUANTITY,
		payload: {
			type,
			item,
		},
	};
}
export function deleteCart(item) {
	return {
		type: Types.DELETE_PRODUCT_IN_CART,
		payload: item,
	};
}
