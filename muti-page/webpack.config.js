/**
 * @Author: Dingjia
 * @Date:   2018-04-05T19:19:01+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-04-06T00:02:58+08:00
 */


const merge = require("webpack-merge")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")

const baseConfig = {
  entry:{
    react:["react"]
  },
  output: {
    path:path.resolve(__dirname,"dist"),
    filename:"js/[name].[chunkhash].js"
  },
  plugins:[
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
console.log(pages.map(page => {
  merge(baseConfig,page)
}))

module.exports = pages.map(page => {
  merge(baseConfig,page)
})
