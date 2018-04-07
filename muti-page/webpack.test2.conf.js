/**
 * @Author: Dingjia
 * @Date:   2018-04-05T19:19:01+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-04-05T23:58:13+08:00
 */



const merge = require("webpack-merge")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")

const baseConfig = {
  entry:{
    react:["react"],
    a:"./src/pages/a",
    b:"./src/pages/b",
    c:"./src/pages/c"
  },
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"js/[name].[chunkhash].js"
  },
  plugins:[
    new CleanWebpackPlugin(path.resolve(__dirname,"dist")),
    new webpack.optimize.CommonsChunkPlugin({
      name:"react",
      minChunks:Infinity
    }),
    new HtmlWebpackPlugin({
      chunks:["react","a"],
      template:"./src/index.html",
      filename:"a.html"
    }),
    new HtmlWebpackPlugin({
      chunks:["react","b"],
      template:"./src/index.html",
      filename:"b.html"
    }),
    new HtmlWebpackPlugin({
      chunks:["react","c"],
      template:"./src/index.html",
      filename:"c.html"
    })
  ]
}



module.exports = baseConfig
