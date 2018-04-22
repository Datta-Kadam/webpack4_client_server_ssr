'use strict';

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
    axios.get('http://server:3001/client/release')
    .then((response) => {
        const middleware = applyMiddleware(thunk);
        const store = createStore(reducers, { fetchReducer: response.data }, middleware);
        //const initialState = serialize(store.getState());  
        const reactComponent = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={{}}>
                    {routes}
                </StaticRouter>
            </Provider>
        );  
        const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames: flushChunkNames() });
       // console.log(js,styles,cssHash);
        //debugger;    
        res.send(`
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <base href="/" />    
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
            <!-- CSS for code mirror and main.css -->
            <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.29.0/codemirror.css" rel="stylesheet" type="text/css">
            ${styles}
            <title>Dual Simlation</title>
          </head>
            <body>
            <div class="container"><div>${reactComponent}</div></div>
            ${cssHash}
            ${js}            
            <script src='bundle.js'></script>
            <script src='vendors~bundle.js'></script>
          </body> 
        </html>
        `);      
    })
    .catch((err) => {
        console.log('#Initial Server side rendering error', err);
    });
};
