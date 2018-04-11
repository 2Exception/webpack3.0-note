/**
 * @Author: Dingjia
 * @Date:   2018-04-09T12:08:16+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-04-09T12:26:30+08:00
 */


//多页单配置
const merge = require("webpack-merge")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")
const ExtractTextWebpack = require("extract-text-webpack-plugin")

const baseConfig = {
  entry:{
    react:["react"]
  },
  output: {
    path:path.resolve(__dirname,"dist"),
    filename:"js/[name].[hash:5].js"
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextWebpack.extract({
          fallback:"style-loader",
          use:"css-loader"
        })
      }
    ]
  },
  plugins:[
    new ExtractTextWebpack({
      filename:"css/[name].[hash:5].css"
    }),
    new CleanWebpackPlugin(path.resolve(__dirname,"dist")),
    new webpack.optimize.CommonsChunkPlugin({
      name:"react",
      minChunks:Infinity
    })
  ]
}

// 多页入口配置 既有entry + HtmlWebpackPlugin
const generatePage = function({
  title = "",
  entry = "",
  template = "./src/index.html",
  name = "",
  chunks = []
} = {}) {
  return {
    entry,
    plugins:[
      new HtmlWebpackPlugin({
        title,
        chunks,
        template,
        filename:name + ".html"
      })
    ]
  }
}
const pages=[
  generatePage({
    title:"pageA",
    entry:{
      a:"./src/pages/a"
    },
    name:"a",
    chunks:["react","a"]
  }),
  generatePage({
    title:"pageB",
    entry:{
      b:"./src/pages/b"
    },
    name:"b",
    chunks:["react","b"]
  }),
  generatePage({
    title:"pageC",
    entry:{
      c:"./src/pages/c"
    },
    name:"c",
    chunks:["react","c"]
  })
]



module.exports = merge([baseConfig].concat(pages))
