import express from 'express';
import fallback from 'express-history-api-fallback';
import cookieParser from 'cookie-parser';
import webpack from 'webpack';
import path from 'path';
import history from 'connect-history-api-fallback';
import expressStaticGzipMiddleware from 'express-static-gzip';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import RequestHandler from './requestHandler'; 

import configDevClient from '../../config/webpack.dev-client';
import configDevServer from '../../config/webpack.dev-server';
import configProdClient from '../../config/webpack.prod-client';
import configProdServer from '../../config/webpack.prod-server';

const server = express();
server.use(cookieParser());

server.use(express.static(path.join(__dirname, 'build')));
const root = `${__dirname = 'build'}`;
const isProd = process.env.NODE_END === 'production';
const isDev = !isProd;

if (false) {
    const compiler = webpack([configDevClient, configDevServer]);
    const clientComplier = compiler.compilers[0];
    const serverComplier = compiler.compilers[1];

   // require('webpack-mild-compile')(compiler);
    debugger;
    const webpackDevMiddlware = require('webpack-dev-middleware')(
        compiler,
        configDevClient.devServer
    );
    debugger;
    const webpackHotMiddleware = require('webpack-hot-middleware')(
        clientComplier,
        configDevClient.devServer
    );   
   
    
  //  server.use(history());
    server.use(webpackDevMiddlware);
    server.use(webpackHotMiddleware);
  //  server.use(webpackHotServerMiddleware(compiler));
  // server.set('view engine', 'ejs');
  // server.use(RequestHandler); 
   // server.use(expressStaticGzipMiddleware(root));
    console.log('Middleware enabled for Development'); 
    
    // server.set('view engine', 'ejs');
    // server.use(RequestHandler);   
} else {
    server.set('view engine', 'ejs');
    server.use(expressStaticGzipMiddleware('build'));
    server.use(RequestHandler);   
    console.log('Middleware enabled for production');  
}

server.use(fallback('index.ejs', `${__dirname = 'build'}`));
server.listen(9999, () => {
    console.log('Server is listening');
});
