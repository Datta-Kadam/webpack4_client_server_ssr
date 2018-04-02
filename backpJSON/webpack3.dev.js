
const path = require('path');
const webpack = require('webpack');

//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnaylyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const VENDOR_LIBS = [
    'webpack-hot-middleware/client',
    'react', 'react-dom', 'react-redux', 'redux',
    'redux-thunk', 'axios', 'lodash', 'react-bootstrap', 
    'react-cookies', 'react-router', 'react-router-dom', 'redux-logger'
    
];

const config = {
    entry: {
        //multiple entry point instead of './src/index.js'
        bundle: [ 
           //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            //'webpack-hot-middleware/client?http://localhost:9999',
            'babel-register',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            'babel-polyfill', './src/index.js'
            ],
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    mode: 'development',
    devServer: {
        contentBase: 'build',
        overlay: true,
        hot: true,
        stats: {
          colors: true
        }
    },
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
    devtool: 'source-map',
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]'
            //             }
            //         },
            //         {
            //             loader: 'extract-loader'
            //         },
            //         {
            //             loader: 'html-loader'
            //         }
            //     ]
            // },
            {
                test: /\.css$/,
                use: [
                  {
                    loader: 'style-loader'
                  },
                  { loader: 'css-loader' }
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
        //Used to seperate all css files into style.css file
        // new ExtractTextPlugin('style.css'),
        //divides bundle app code and vendor(react , redux etc) code
        //adds the vendor.js and bundle.js script 
        //into index.html automatically after changes in file and build done
        new webpack.HotModuleReplacementPlugin(),        
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //react used NODE_ENV on window scope
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development') }
        })
        // new BundleAnaylyzerPlugin({
        //     generateStatsFile: true
        // })
    ]
};

module.exports = config;
