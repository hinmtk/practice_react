const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(path.join(__dirname, './assets/js'));

module.exports = [{
  mode: 'development',
  entry:{
    app:'./src/app.jsx'
  },
  devtool: 'inline-source-map',
  output:{
    path: path.join(__dirname, './assets/js'),
    filename:'[name].bundle.js',
    publicPath:'/assets/js/'
  },
  module:{
    rules:[
      {
        test:/\.jsx$/,
        exclude:/node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-react', '@babel/preset-env']
            },
          }
        ],
      }
    ]
  }
},
{
  mode: 'development',
  entry:{
    style:'./scss/style.scss'
  },
  output:{
    path: path.join(__dirname, './assets/css'),
    filename:'[name].css',
    publicPath:'/assets/css/'
  },
  module:{
    rules:[
      {
        test:/\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ],
      },
    ],
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
}
];