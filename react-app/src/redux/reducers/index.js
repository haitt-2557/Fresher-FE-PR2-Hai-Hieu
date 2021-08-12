/** @format */

import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
	account: accountReducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	productReducer,
	categoryReducer,
});
export default rootReducer;
