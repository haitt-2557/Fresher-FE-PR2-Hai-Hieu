/** @format */
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import PaymentLayout from './layouts/PaymentLayout';
import PrivateLayout from './layouts/PrivateLayouts';
import PublicLayout from './layouts/PublicLayout';
import ManageProduct from './pages/Admin/Manage Product/index';
import ManageCategory from './pages/Admin/Manage Category/index';
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
					<PaymentLayout exact path='/profile' component={React.lazy(() => import('./pages/User/Profiles/profile'))} />
					<PaymentLayout exact path='/profile/password' component={React.lazy(() => import('./pages/User/Profiles/changepass'))} />
					<PaymentLayout exact path='/profile/purchases' component={React.lazy(() => import('./pages/User/Profiles/purchase'))} />
					<PrivateLayout exact path='/admin' component={React.lazy(() => import('./pages/Admin/index'))}></PrivateLayout>
					<Route
						exact
						path='/admin/manage-product'
						render={() => (
							<PrivateLayout>
								<ManageProduct />
							</PrivateLayout>
						)}></Route>
					<Route
						exact
						path='/admin/manage-category'
						render={() => (
							<PrivateLayout>
								<ManageCategory />
							</PrivateLayout>
						)}></Route>
				</Switch>
			</Router>
		</Suspense>
	);
}

export default App;
