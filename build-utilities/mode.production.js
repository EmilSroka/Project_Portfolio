const { ProgressPlugin } = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: [CssExtractPlugin.loader, 'css-loader', 'sass-loader'] 
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new CssExtractPlugin(),
    new StyleExtHtmlWebpackPlugin({
      file: 'dependencies.css',
      minify: true
    }),
    new MinifyPlugin()
  ]
}