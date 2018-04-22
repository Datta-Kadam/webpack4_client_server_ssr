
const path = require('path');
const webpack = require('webpack');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require("brotli-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const config = {
    name: 'client',
    entry: {
        bundle: [ 'babel-polyfill', './src/index.js']
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: '/'
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
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
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
        new MiniCSSExtractPlugin(),
        
        //Used to seperate all css files into style.css file       
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        //react used NODE_ENV on window scope
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production'), WEBPACK: true }
        }),
        //for minification for Javascript files
        
    ]
};

module.exports = config;
