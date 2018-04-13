const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const nodeExternals = require('webpack-node-externals');
const externals = require("./node-externals");

const config = {
    name: 'server',
    target: 'node',
    externals,
    entry: './src/server/requestHandler.js',    
    output: {
        filename: 'dev-server-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2'
    },
    mode: 'development',     
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
        overlay: true,
        hot: true,
        stats: {
          colors: true
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
        
        new ExtractTextPlugin('main.css'),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        //react used NODE_ENV on window scope
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('development'), WEBPACK: true }
        })
       
    ]
};

module.exports = config;
