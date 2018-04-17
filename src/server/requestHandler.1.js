'use strict';

import serialize from 'serialize-javascript';
import axios from 'axios';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import reducers from '../reducers/index';
import routes from '../routes';


export default ({ clientStats }) => (req, res) => {
    debugger;
    const { js, styles } = flushChunks(clientStats, { chunkNames: flushChunkNames() });
debugger;
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
        res.status(200).render('index', { reactComponent, initialState, js, styles });       
    })
    .catch((err) => {
        console.log('#Initial Server side rendering error', err);
    });
};
