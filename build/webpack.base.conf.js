'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

    // const api='http://54.242.82.119'
const api = 'http://spi067'

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay
    }
})

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Vue: ['vue/dist/vue.esm.js', 'default'],
            moment: 'moment'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                /**
                TOOLS_API: JSON.stringify("http://10.35.255.22:8004"),
                OP_API: JSON.stringify("http://10.35.255.22:8005"),
                THINGS_API: JSON.stringify("http://10.35.255.22:8001"),
                PROD_HIST_API: JSON.stringify("http://10.35.255.22:8007"),
                RECIPE_API: JSON.stringify("http://10.35.255.22:8003"),
                STATUS_API: JSON.stringify("http://10.35.255.22:8006"),
                HIST_BIGTABLE_API: JSON.stringify("http://10.35.255.22:8011")
                */
                TOOLS_API: JSON.stringify(api+":8005"),
                OP_API: JSON.stringify(api+":8003"),
                THINGS_API: JSON.stringify(api+":8001"),
                PROD_HIST_API: JSON.stringify(api+":8006"),
                RECIPE_API: JSON.stringify(api+":8002"),
                STATUS_API: JSON.stringify(api+":8004"),
                HIST_BIGTABLE_API: JSON.stringify(api+":8011"),
                HIST_ALARM_API: JSON.stringify(api+":8012"),                
            }            
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
    ],

    module: {
        rules: [{
                test: /[\/]jquery\.js$/,
                loader: 'expose-loader'
            },
            {
                test: /vendor\/.+\.(jsx|js)$/,
                loader: 'imports?jQuery=jquery,$=jquery,this=>window'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('axios')],
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}