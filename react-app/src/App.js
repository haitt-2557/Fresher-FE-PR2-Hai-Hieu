/** @format */
import React, { Suspense } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Headers';
import PaymentLayout from './layouts/PaymentLayout'
import { Spin } from 'antd';
function App() {
	const user = localStorage.getItem('profile');
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
				<Header />
				<Container maxWidth='lg'>
					<Switch>
						<Route exact path='/' component={React.lazy(() => import('./pages/User/Home'))} />
						<Route exact path='/login' component={React.lazy(() => import('./pages/User/Login'))} />
						<Route exact path='/register' component={React.lazy(() => import('./pages/User/Register'))} />
						<Route exact path='/product/:id' component={React.lazy(() => import('./pages/User/ProductDetails'))} />
						<Route exact path='/shop' component={React.lazy(() => import('./pages/User/Products'))} />
						<Route exact path='/cart' component={React.lazy(() => import('./pages/User/Cart'))}></Route>
						{/* <Route exact path='/profile' component={React.lazy(() => import('./pages/User/Profiles'))}></Route> */}
						<PaymentLayout exact path="/payment" component={React.lazy(() => import('./pages/User/Payment/component/payment'))} />
						<PaymentLayout exact path="/shipping" component={React.lazy(() => import('./pages/User/Payment/component/paymentShipping'))} />
					</Switch>
				</Container>
				<Footer />
			</Router>
		</Suspense>
	);
}

export default App;
