const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { plugins } = require('./plugins/dev_plugins')

module.exports = merge(common, {
    mode: 'production',
    plugins: plugins
})