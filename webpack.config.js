const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry: ["babel-polyfill", "./src/js/main.js"],
  // devtool: 'eval-source-map',
  devtool: 'inline-source-map',
  entry: ["./src/js/main.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    // historyApiFallback: true,//不跳转
    hot: true,
    hotOnly: true,
    // inline: true,//实时刷新
    port: 1234
    // publicPath: '/build/' //build是在内存中的，devServer建立的，需要index.html对应文件路径
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      }
      // {
      //   test: /\.styl$/,
      //   exclude: /node_modules/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       { loader: 'css-loader', options: { sourceMap: true } },
      //       { loader: 'postcss-loader', options: { sourceMap: true } },
      //       { loader: 'stylus-loader', options: { sourceMap: true } }
      //     ]
      //   })
      // }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'my webpack demo',  // 生成 HTML 文档的标题
      filename: 'index.html', // 写入 HTML 文件的文件名，默认 `index.html`
      template: path.resolve(__dirname, './src/index.html'),
      inject: true, //这个东西非常重要，true: 自动写入依赖文件; false: 不写入依赖，构建多页面非常有用
    }),
    // new ExtractTextPlugin('../css/style.css')
    // new ExtractTextPlugin('style.css'), //移动css到独立的文件中，而不是内嵌在js中
    // new UglifyJsPlugin({
    //   exclude: /node_modules/,
    //   uglifyOptions: {
    //     output: {
    //       comments: false,
    //       beautify: false
    //     }
    //   }
    // }),
    new CleanWebpackPlugin(['dist']), // 第一个参数是要清理的目录的字符串数组
    new webpack.NamedModulesPlugin() // 打印日志信息时 webpack 默认使用模块的数字 ID 指代模块，不便于 debug，这个插件可以将其替换为模块的真实路径
  ]
}