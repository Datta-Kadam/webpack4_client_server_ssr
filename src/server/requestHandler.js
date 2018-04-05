'use strict';

import serialize from 'serialize-javascript';
import axios from 'axios';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import routes from '../routes';

export default () => (req, res) => {
    axios.get('http://localhost:3001/client/release')
    .then((response) => {
        const middleware = applyMiddleware(thunk);
        const store = createStore(reducers, { fetchReducer: response.data }, middleware);
        const initialState = serialize(store.getState());  
        const reactComponent = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={{}}>
                    {routes}
                </StaticRouter>
            </Provider>
        );        
        res.status(200).render('index', { reactComponent, initialState });       
    })
    .catch((err) => {
        console.log('#Initial Server side rendering error', err);
    });
};
