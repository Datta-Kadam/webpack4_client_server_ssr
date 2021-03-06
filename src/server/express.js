import express from 'express';
import httpProxy from 'http-proxy';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
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
        const clientStats = stats.toJson().children[0];
        const render = require('../../dist/prod-server-bundle.js').default;
        //Proxy to API
        const apiProxy = httpProxy.createProxyServer({
            target: 'http://server:3001'
        });
        debugger;
        server.use('/api', (req, res) => {
            apiProxy.web(req, res);
        });
        debugger;
        // console.log(
        //     stats.toString({
        //       colors: true
        //     })
        //   );
        server.use(expressStaticGzipMiddleware('build'));
        server.use(render({ clientStats }));   
        console.log('Middleware enabled for production');  
    });  
}

const PORT = process.env.PORT || 9998;
server.listen(PORT, () => {
    console.log(`Server is listening on http://192.168.99.100:${PORT}/`);
});
