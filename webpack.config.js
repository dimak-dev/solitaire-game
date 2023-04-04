const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");

const isProduction = false;
const publicUrl = '/'

module.exports = {
    entry: './src/index.js',
    resolve: {
        alias: {
            'Components': path.resolve(__dirname, './src/components/'),
            'Pages': path.resolve(__dirname, './src/pages/'),
            'Redux': path.resolve(__dirname, './src/redux/'),
            'Types': path.resolve(__dirname, './src/types/'),
            'Utils': path.resolve(__dirname, './src/utils/'),
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: isProduction ? 'production' : 'development',
    output: {
        path: path.resolve(__dirname, './dist'),
        pathinfo: !isProduction,
        filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/bundle.js',
        chunkFilename: isProduction ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
        clean: true,
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                generator: {
                    filename: 'static/js/[name].[hash][ext]'
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html/,
                use: 'html-loader'
            },
            {
                test: /\.svg/,
                // use: [
                //     {
                //         loader: '@svgr/webpack',
                //     }
                // ],,
                type: 'asset/resource',
                generator: {
                    filename: 'static/svg/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(png|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/img/[name].[hash][ext]'
                }
            },
            {
                test: /\.css/,
                // type: 'asset/resource',
                use: [
                    'style-loader',
                    'css-loader',
                ],
                generator: {
                    filename: 'static/css/[name].[hash][ext]'
                }
            },

            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            inject: true
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
            NODE_ENV: process.env.NODE_ENV || 'development',
            PUBLIC_URL: publicUrl
        }),
    ],
    devServer: {
        // static: {
        //     directory: path.resolve(__dirname, '../public'),
        // },
        port: 9000,
    }
};