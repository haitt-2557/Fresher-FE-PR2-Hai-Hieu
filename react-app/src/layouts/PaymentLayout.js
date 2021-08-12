/** @format */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
function PaymentLayout({ component: Component, ...props }) {
	const users = localStorage.getItem('profile');
	return users ? (
		<Route {...props} render={(routerProps) => <Component {...routerProps} />} />
	) : (
		<Redirect to='/login'>
			{toast.warning('You need to log in first !', {
				position: toast.POSITION.TOP_RIGHT,
			})}
		</Redirect>
	);
}
export default PaymentLayout;
