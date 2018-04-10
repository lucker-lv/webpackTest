const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].[chunkhash:6].js',
  },
  module: {
    loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production') // 在编译的代码里设置了`process.env.NODE_ENV`变量
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false
    }),
    new ExtractTextPlugin({ //移动css到独立的文件中，而不是内嵌在js中
      filename: 'css/[name].[contenthash:6].css',
      // filename:  (getPath) => {
      //   return getPath('css/[name].css').replace('css/js', 'css');
      // },
      allChunks: false
    }),
    // new webpack.optimize.CommonsChunkPlugin({ //抽取公共的模块
    //   name: 'common' // 抽取出的模块的模块名
    // }),
    new webpack.HashedModuleIdsPlugin(), // 替换掉原来的`module.id`
    new CleanWebpackPlugin(['dist/js', 'dist/css'])
  ]
});