/**
 * @Author: Dingjia
 * @Date:   2018-03-31T14:55:48+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-04-02T00:50:04+08:00
 */


const webpack = require("webpack")
module.exports = {
  devtool:"cheap-module-source-map",
  devServer:{
    inline:true,//在console开启打包状态
    port:8081,
    overlay:true,
    hot:true,
    hotOnly:true,
    // proxy:{
    //   "/":{
    //     target:"https://m.weibo.cn",
    //     changeOrigin:true,
    //     logLevel:"debug",
    //     pathRewrite:{
    //       "^/comments":"/api/comments"
    //     },
    //     headers:{
    //       "Cookie":""
    //     }
    //   }
    // },
    historyApiFallback:{//html重定向
      rewrite:{
        from:/^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
        to:function(ctx){
          return "/" + ctx.match[1] + ctx.match[2] + ".html"
        }
      }
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
