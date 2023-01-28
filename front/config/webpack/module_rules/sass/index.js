const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    test: /\.(scss|css)$/,
      use: [
        process.env.NODE_ENV === 'production' 
        ? 'style-loader'
        : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
}