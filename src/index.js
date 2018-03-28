//Automatically added using tranform runtime plugin added in .babelrc
//import 'babel-plugin-transform-runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
//import CookiesProvider from 'react-cookies';
import Header from './components/header';
import reducers from './reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';
import routes from './routes';


const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const Routes = (
  //<CookiesProvider>
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          {routes}
      </BrowserRouter>
  </Provider>
 // </CookiesProvider>
);

ReactDOM.render(
  Routes
  , document.querySelector('.container'));
