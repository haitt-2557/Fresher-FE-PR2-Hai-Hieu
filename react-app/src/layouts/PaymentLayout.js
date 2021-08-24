/** @format */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'antd';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import Header from '../components/Headers';
import InfoCart from '../components/InfoCart'
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
						<Row gutter={24}>
							<Col md={14} sm={24} lg={14}>
								<Component {...routerProps} />
							</Col>
							<Col md={10} sm={24} lg={10}>
								<InfoCart />
							</Col>
						</Row>
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
