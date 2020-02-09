const webpackMerge = require("webpack-merge");
const HtmlPlugin = require('html-webpack-plugin');
const HtmlInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = ({mode} = {mode: 'production'}) => {
  return webpackMerge(
    {
      entry: {
        dependencies: './src/dependencies.js',
        main: './src/main.js',
      },
      plugins: [
        new HtmlPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new HtmlInlineSVGPlugin(),
        new CopyPlugin([{ 
            from: 'src/assets/static', 
            to: 'assets/static' 
        }])
      ]
    }, 
    modeConfig(mode)
  )
}

// utils

function modeConfig(mode){
    return require(`./build-utilities/mode.${mode}.js`);
}