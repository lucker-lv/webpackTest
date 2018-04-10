const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
      // {
      //   test: /\.styl$/,
      //   use: [
      //     { loader: 'style-loader', options: { sourceMap: true } },
      //     { loader: 'css-loader', options: { sourceMap: true } },
      //     { loader: 'postcss-loader', options: { sourceMap: true } },
      //     { loader: 'stylus-loader', options: { sourceMap: true } }
      //   ]
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my webpack demo',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      minify: { //html压缩
        removeComments: true, //移除注释
        // collapseWhitespace: true //移除空格
      }
    }),
    // new webpack.ProvidePlugin({ // 设置全局变量
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
  ]
};