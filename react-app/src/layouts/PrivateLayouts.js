/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
function PrivateLayout({ component: Component, ...props }) {
	const users = localStorage.getItem('profile');
	return users?.user.role === 'admin' ? (
		<Route {...props} render={(routerProps) => <Component {...routerProps} />} />
	) : (
		<Redirect to='/'>
			{toast.warning("You don't have permission to access this page", {
				position: toast.POSITION.TOP_RIGHT,
			})}
		</Redirect>
	);
}
export default PrivateLayout;
