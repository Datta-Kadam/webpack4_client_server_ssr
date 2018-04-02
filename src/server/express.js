//require('babel-register');

import express from 'express';
import fallback from 'express-history-api-fallback';

//import path from 'path';
const webpack = require('webpack');
const config = require('../../config/webpack.dev');
const history = require('connect-history-api-fallback');

//Sert up for Hot reloading using webpack-dev-middlware
const compiler = webpack(config);
const webpackDevMiddlware = require('webpack-dev-middleware')(
    compiler,
    config.devServer, {
        publicPath: config.output.publicPath
    }
);
const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

const server = express();
server.use(history());
server.use(webpackDevMiddlware);
server.use(webpackHotMiddleware);

//debugger;
//static middlware for serving static react content from build directory

// const staticMiddleware = express.static('build');
// server.use(staticMiddleware);
// server.use(fallback('index.html', __dirname='build'));
//console.log('staticMiddleware', staticMiddleware);
const root = `${__dirname = 'build'}`;
// console.log('Static path = > ', root);
// const root1 = `${__dirname}\\public`;
//console.log('ROOOOOT', __dirname='build');
/**middlware with express static  */
// const staticMiddleware = express.static(root);
// server.use(staticMiddleware);
/**middleware with express statuc gzip servering content in gzip format for static files */

const expressStaticGzipMiddleware = require('express-static-gzip');

server.use(expressStaticGzipMiddleware(root));
server.use(fallback('index.html', { root }));
//debugger;
server.listen(9999, () => {
    console.log('Server is listening');
});
