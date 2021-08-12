/** @format */
import React, { Suspense } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Headers';
import { Spin } from 'antd';
function App() {
	return (
		<Suspense fallback={<Spin style={{ margin: '0 auto' }} />}>
			<Router>
				<Header />
				<Container maxWidth='lg'>
					<Switch>
						<Route
							exact
							path='/'
							component={React.lazy(() => import('./pages/User/Home'))}
						/>
						<Route
							exact
							path='/login'
							component={React.lazy(() => import('./pages/User/Login'))}
						/>
						<Route
							exact
							path='/register'
							component={React.lazy(() => import('./pages/User/Register'))}
						/>
					</Switch>
				</Container>
				<Footer />
			</Router>
		</Suspense>
	);
}

export default App;
