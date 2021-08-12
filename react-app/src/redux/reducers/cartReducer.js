/** @format */

import Types from '../constants/cart.constant';
const cartItem = JSON.parse(localStorage.getItem('productCart'));
const cartState = {
	cartData: cartItem ? cartItem.cartData : [],
	totalCost: cartItem ? cartItem.totalCost : 0,
	cartNumber: cartItem ? cartItem.cartNumber : 0,
};

export const cartReducer = (state = cartState, action) => {
	switch (action.type) {
		case Types.ADD_TO_CART: {
			if (action.payload.quantity > 1) {
				state.totalCost += action.payload.quantity * action.payload.newPrice;
			} else {
				state.totalCost = state.totalCost + action.payload.newPrice;
			}

			let existInCart = false;
			state.cartData.forEach((item) => {
				if (item.id === action.payload.id) {
					action.payload.quantity > 1 ? (item.quantity += action.payload.quantity) : (item.quantity += 1);
					existInCart = true;
				}
			});
			if (!existInCart) {
				state.cartData.push(action.payload);
				state.cartNumber = state.cartData.length;
			}
			localStorage.setItem('productCart', JSON.stringify(state));

			return { ...state };
		}
		case Types.UPDATE_QUANTITY: {
			state.cartData.forEach((product) => {
				if (product.id === action.payload.item.id) {
					if (action.payload.type === 'increase') {
						product.quantity += 1;
						state.totalCost += product.newPrice;
					} else {
						if (product.quantity > 1) {
							product.quantity -= 1;
							state.totalCost -= product.newPrice;
						}
					}
				}
			});

			localStorage.setItem('productCart', JSON.stringify(state));
			return { ...state };
		}
		case Types.DELETE_PRODUCT_IN_CART: {
			if (action.payload) {
				const newCart = state.cartData.filter((item) => item.id !== action.payload.id);
				state.totalCost -= action.payload.newPrice * action.payload.quantity;

				state = { ...state, cartData: newCart, cartNumber: newCart.length };
				localStorage.setItem('productCart', JSON.stringify(state));

				return { ...state };
			} else {
				state.cartData = [];
				state.cartNumber = 0;
				state.totalCost = 0;
				localStorage.clear();
			}
			return { ...state };
		}
		case Types.REMOVE_CART: {
			state = { ...state, cartData: [], cartNumber: 0, totalCost: 0 };
			localStorage.removeItem('productCart');

			return { ...state };
		}

		default:
			return state;
	}
};
