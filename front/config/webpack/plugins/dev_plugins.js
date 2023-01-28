const HTMLWebpackPlugin = require('html-webpack-plugin')
const { paths } = require('../../paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const plugins = [
    new HTMLWebpackPlugin({
            template: paths.public_html
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].css'
    })
]

module.exports = { plugins }