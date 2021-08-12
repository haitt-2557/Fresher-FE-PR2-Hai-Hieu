/** @format */
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Headers';
import Login from './pages/User/Login';
import './assets/scss/index.scss';

function App() {
	return (
		<Router>
			<Header />
			<Container maxWidth='lg'>
				<Switch>
					<Route exact path='/login' component={Login} />
				</Switch>
			</Container>
			<Footer />
		</Router>
	);
}

export default App;
