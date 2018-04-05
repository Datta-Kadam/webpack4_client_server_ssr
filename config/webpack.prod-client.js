
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');


const config = {
    name: 'client',
    entry: {
        bundle: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].js',
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
        //for optimising css contents
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {
                removeAll: true
            } },
            canPrint: true
        }),
        //Used to seperate all css files into style.css file
        new ExtractTextPlugin('main.css'),
        // new HtmlWebpackPlugin({
        //     template: './src/index.html'
        // }),
        //react used NODE_ENV on window scope
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        //for minification for Javascript files
        new MinifyPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip'
        })
    ]
};

module.exports = config;
