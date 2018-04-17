
const path = require('path');
const webpack = require('webpack');

const externals = require('./node-externals');

const config = {
    name: 'server',
    target: 'node',
    externals,
   // entry: ['babel-polyfill', './src/server/requestHandler.js'],
    entry: './src/server/requestHandler.js',
    output: {
        filename: 'prod-server-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2'      
    },
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },   
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: {
                  loader: 'css-loader'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 60000 }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
       // new ExtractTextPlugin('main.css'),
       new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        })
       
    ]
};

module.exports = config;
