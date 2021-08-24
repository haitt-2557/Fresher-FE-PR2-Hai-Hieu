/** @format */
import React, { Suspense } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Headers';
import { Spin } from 'antd';
import PaymentLayout from './layouts/PaymentLayout';
import PrivateLayout from './layouts/PrivateLayouts';
import PublicLayout from './layouts/PublicLayout';
function App() {
	return (
		<Suspense
			fallback={
				<Spin
					tip='Loading...'
					size='large'
					style={{
						display: 'block',
						fontSize: '20px',
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%,-50%)',
					}}
				/>
			}>
			<Router>
				<Switch>
					<PublicLayout exact path='/' component={React.lazy(() => import('./pages/User/Home'))} />
					<PublicLayout exact path='/login' component={React.lazy(() => import('./pages/User/Login'))} />
					<PublicLayout exact path='/register' component={React.lazy(() => import('./pages/User/Register'))} />
					<PublicLayout exact path='/product/:id' component={React.lazy(() => import('./pages/User/ProductDetails'))} />
					<PublicLayout exact path='/shop' component={React.lazy(() => import('./pages/User/Products'))} />
					<PublicLayout exact path='/cart' component={React.lazy(() => import('./pages/User/Cart'))}></PublicLayout>
					<PublicLayout exact path="/success/:id" component={React.lazy(() => import('./pages/User/Success'))} />
					<PublicLayout exact path='/profile' component={React.lazy(() => import('./pages/User/Profiles/profile'))} />
					<PaymentLayout exact path="/payment" component={React.lazy(() => import('./pages/User/Payment/component/payment'))} />
					<PaymentLayout exact path="/shipping" component={React.lazy(() => import('./pages/User/Payment/component/paymentShipping'))} />
					<PaymentLayout exact path="/paymentConfirm" component={React.lazy(() => import('./pages/User/Payment/component/paymentConfirm'))} />
					<PaymentLayout exact path='/profile/password' component={React.lazy(() => import('./pages/User/Profiles/changepass'))} />
					<PaymentLayout exact path='/profile/purchases' component={React.lazy(() => import('./pages/User/Profiles/purchase'))} />
					<PrivateLayout exact path='/admin' component={React.lazy(() => import('./pages/Admin/index'))}></PrivateLayout>
				</Switch>
			</Router >
		</Suspense >
	);
}

export default App;
