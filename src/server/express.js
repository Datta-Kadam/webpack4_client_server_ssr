import express from 'express';
//import fallback from 'express-history-api-fallback';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
// import path from 'path';
// import history from 'connect-history-api-fallback';
import expressStaticGzipMiddleware from 'express-static-gzip';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../../config/webpack.dev-client';
import configDevServer from '../../config/webpack.dev-server';
import configProdClient from '../../config/webpack.prod-client';
import configProdServer from '../../config/webpack.prod-server';

const server = express();
server.use(cookieParser());

/* Template engine to SSR index.ejs from views folder 
for both production and development*/
//server.set('view engine', 'ejs');

/* Need double quote for "production as with single quotes its not working in windows ENV" */
const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

if (isDev) {
    const compiler = webpack([configDevClient, configDevServer]);
    const clientComplier = compiler.compilers[0];
   // const serverComplier = compiler.compilers[1];
    const webpackDevMiddlware = require('webpack-dev-middleware')(
        compiler,
        configDevClient.devServer
    );
    const webpackHotMiddleware = require('webpack-hot-middleware')(
        clientComplier,
        configDevClient.devServer
    );
    server.use(webpackDevMiddlware);
    server.use(webpackHotMiddleware);
    server.use(webpackHotServerMiddleware(compiler));
    console.log('Middleware enabled for Development'); 
} else {
    //Make the webpack client and server js available run below webpack function    
    webpack([configProdClient, configProdServer]).run((err, stats) => {
        debugger;
        const clientStats = stats.toJson().children[0];
        debugger;
        const render = require('../../dist/prod-server-bundle.js').default;
        console.log(
            stats.toString({
              colors: true
            })
          );
        server.use(expressStaticGzipMiddleware('build'));
        server.use(render({ clientStats }));   
        console.log('Middleware enabled for production');  
    });  
}

const PORT = process.env.PORT || 9998;
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
});
