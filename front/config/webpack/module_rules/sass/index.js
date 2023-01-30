const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
}