/** @format */

import { combineReducers } from 'redux';
import { accountReducer } from './accountReducer';
import { authReducer } from './authReducer';
import { cartReducer } from './cartReducer';
import { orderReducer } from './orderReducer';
import { productReducer } from './productReducer';

const rootReducer = combineReducers({
	account: accountReducer,
	auth: authReducer,
	cart: cartReducer,
	order: orderReducer,
	product: productReducer,
});
export default rootReducer;
