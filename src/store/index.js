import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import * as createHistory from 'history';
import thunk from 'redux-thunk';

const createBrowserHistory = createHistory.createBrowserHistory;
const history = createBrowserHistory();

import Reducers from './reducers';

import rootSaga from './sagas/rootSaga';

import routeMiddleware from '../data/routing/routeMiddleware';
let routingMiddleware = routeMiddleware(history);

const sagaMiddleware = createSagaMiddleware();
const middleware = composeWithDevTools(
  applyMiddleware(sagaMiddleware, routingMiddleware, thunk),
);

const store = createStore(Reducers, middleware);
sagaMiddleware.run(rootSaga);

export default store;
export {history};
