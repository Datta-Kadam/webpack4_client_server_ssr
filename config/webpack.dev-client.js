
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
//const BundleAnaylyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

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
        path: path.resolve(__dirname, '../build'),
        filename: '[name].bundle.js',
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
    devtool: 'source-map',   
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
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),        
        //new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development'), WEBPACK: true }
        })
        // new BundleAnaylyzerPlugin({
        //     generateStatsFile: true
        // })
    ]
};

module.exports = config;
