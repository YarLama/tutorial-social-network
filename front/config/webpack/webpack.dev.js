const { merge } = require('webpack-merge')
const DEV_SERVER = require('./dev_server/dev_server')
const common = require('./webpack.common.js')
const { plugins } = require('./plugins/dev_plugins')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: DEV_SERVER,
    plugins: plugins
})