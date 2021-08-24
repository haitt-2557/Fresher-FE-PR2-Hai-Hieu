/** @format */

import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import { productDetailReducer } from './productDetail.reducer';
import paymentReducer from "./payment.reducer";
import { wishListReducer } from './wishlist.reducer';

const rootReducer = combineReducers({
	accountReducer: accountReducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	productReducer,
	productDetailReducer,
	categoryReducer,
	paymentReducer,
	wish: wishListReducer,
});
export default rootReducer;
