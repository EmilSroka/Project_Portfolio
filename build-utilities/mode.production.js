const { ProgressPlugin } = require('webpack');
const CssExtractPlugin = require('mini-css-extract-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const Autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: [CssExtractPlugin.loader, 'css-loader',
        {
          loader: 'postcss-loader',
          options: { plugins: [Autoprefixer] }
        }, 'sass-loader'] 
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