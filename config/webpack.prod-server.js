
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
    name: 'server',
    target: 'node',
    externals: nodeExternals(),
    entry: {
        //multiple entry point instead of './src/index.js'
        server: ['babel-polyfill', './src/server/main.js']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-bundle.js'
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
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
        new ExtractTextPlugin('style.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        })
       
    ]
};

module.exports = config;
