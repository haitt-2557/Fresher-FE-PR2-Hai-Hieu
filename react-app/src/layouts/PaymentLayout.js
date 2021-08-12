/** @format */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateLayout({ component: Component, ...props }) {
	const users = localStorage.getItem('profile');
	return users ? <Route {...props} render={(routerProps) => <Component {...routerProps} />} /> : <Redirect to='/login' />;
}
export default PrivateLayout;
