'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
    // const api = process.env.DEV_API_ADDRESS

// const api = process.env.DEV_API_ADDRESS;
const api = "http://35.170.191.75";
//const api = "http://192.168.11.242";
//'192.168.11.242'

console.log("Build Env Dev:" + api)

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
    },

    devtool: config.dev.devtool,

    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        hot: true,
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true,
        watchOptions: {
            poll: config.dev.poll,
        }
    },
    externals: [
        'canvas',
        'jsdom',
        'parse5'
    ],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/dev.env'),
        }),

        new webpack.DefinePlugin({
            $: "jquery",
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            jQuery: 'jquery'
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new webpack.DefinePlugin({
            'process.env': {


                //IP SPI
                TOOLS_API: JSON.stringify(api + ":8005"),
                OP_API: JSON.stringify(api+":8003"),
                THINGS_API: JSON.stringify(api + ":8001"),
                PROD_HIST_API: JSON.stringify(api + ":8006"),
                RECIPE_API: JSON.stringify(api + ":8002"),
                STATUS_API: JSON.stringify(api + ":8004"),
                HIST_BIGTABLE_API: JSON.stringify(api + ":8011"),
                HIST_ALARM_API: JSON.stringify(api + ":8012"),
                REPORT_API: JSON.stringify(api + ":8007"),
                LINE_PARAMETERS_API: JSON.stringify(api + ":8013"),
                USER_API: JSON.stringify(api + ":8010"),
                ANALYSIS_API: JSON.stringify(api + ":8014"),

                USER_TRUE: true
                //IP NUVEM
                // TOOLS_API: JSON.stringify(api + ":8005"),
                // OP_API: JSON.stringify(api + ":8003"),
                // THINGS_API: JSON.stringify(api + ":8001"),
                // PROD_HIST_API: JSON.stringify(api + ":8006"),
                // RECIPE_API: JSON.stringify(api + ":8003"),
                // STATUS_API: JSON.stringify(api + ":8004"),
                // HIST_BIGTABLE_API: JSON.stringify(api + ":8006"),
                // HIST_ALARM_API: JSON.stringify(api + ":8012"),
                // REPORT_API: JSON.stringify(api + ":8007"),
                // LINE_PARAMETERS_API: JSON.stringify(api + ":8013"),
                // USER_API: JSON.stringify(api + ":8010"),
            }
        }),
        new webpack.ProvidePlugin({
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
            Util: "exports-loader?Util!bootstrap/js/dist/util",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Vue: ['vue/dist/vue.esm.js', 'default'],
            moment: 'moment'
        })
    ]
})

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() : undefined
            }))

            resolve(devWebpackConfig)
        }
    })

})