module.exports = {
  mode: 'development',
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'] 
      }
    ]
  },
  devServer: {
    hot: true
  }
}