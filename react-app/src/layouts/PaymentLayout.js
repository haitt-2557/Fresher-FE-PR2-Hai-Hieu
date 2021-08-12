/** @format */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Headers';
import { Container } from '@material-ui/core';
function PaymentLayout({ component: Component, ...props }) {
	const users = localStorage.getItem('profile');
	return users ? (
		<Route
			{...props}
			render={(routerProps) => (
				<>
					<Header />
					<Container maxWidth='lg'>
						<Component {...routerProps} />
					</Container>
					<Footer />
				</>
			)}
		/>
	) : (
		<Redirect to='/login'>
			{toast.warning('You need to log in first !', {
				position: toast.POSITION.TOP_RIGHT,
			})}
		</Redirect>
	);
}
export default PaymentLayout;
