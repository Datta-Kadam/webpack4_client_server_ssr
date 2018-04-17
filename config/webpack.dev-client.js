
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnaylyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const config = {
    name: 'client',
    entry: {
        bundle: [ 
           //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
            //'webpack-hot-middleware/client?http://localhost:9999',
            'babel-register',
            'react-hot-loader/patch',
            'webpack-hot-middleware/client',
            'babel-polyfill', './src/index.js'
            ]
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, '../build'),       
        publicPath: '/'
    },
    mode: 'development',    
    devtool: 'source-map',
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
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //       {
            //         loader: 'style-loader'
            //       },
            //       { loader: 'css-loader' }
            //     ]
            //   },
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
                        options: { limit: 6000 }
                    },
                    'image-webpack-loader'
                ]
            },
            // {
            //     test: /\.(jpe?g|png|gif|svg)$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: { name: '/images/[name].[ext]' }
            //         }
            //     ]
            // }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(), 
        new webpack.DefinePlugin({
            'process.env': { 
                NODE_ENV: JSON.stringify('development'),
                WEBPACK: true 
            }
        })
        // new BundleAnaylyzerPlugin({
        //     generateStatsFile: true
        // })
    ]
};

module.exports = config;
