/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomeAdmin from '../pages/Admin';
function PrivateLayout({ children }) {
	const users = useSelector((state) => state.auth.authData);

	return users?.user?.role === 'admin' ? (
		<HomeAdmin>{children}</HomeAdmin>
	) : (
		<Redirect to='/'>
			{toast.warning("You don't have permission to access this page", {
				position: toast.POSITION.TOP_RIGHT,
			})}
		</Redirect>
	);
}
export default PrivateLayout;
