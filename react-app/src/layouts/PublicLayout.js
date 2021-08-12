/** @format */

import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer';
import Header from '../components/Headers';
export default function PublicLayout({ component: Component, ...props }) {
	return (
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
	);
}
