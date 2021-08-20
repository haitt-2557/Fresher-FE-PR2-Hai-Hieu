/** @format */

import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(sagaMiddleware);
const store = createStore(rootReducer, composeEnhancer(middleware));

sagaMiddleware.run(rootSaga);
export default store;
