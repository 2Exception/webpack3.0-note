/**
 * @Author: Dingjia
 * @Date:   2018-04-04T22:05:26+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2018-04-04T23:20:37+08:00
 */



//区分第三方依赖和业务代码
//webpack.dll.conf.js 专门打包第三方依赖
const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: {
    vue:["vue","vue-loader"],
    ui:["element-ui"]
  },
  output:{//打包一次很久不用删除，所以不能放在dist下
    path:path.join(__dirname,"../src/dll/"),
    filename:"[name].dll.js",
    library:"[name]"
  },
  plugins:[
    new webpack.DllPlugin({
      path:path.join(__dirname,"../src/dll/","[name]-manifest.json"),
      name:"[name]"
    }),

    new webpack.optimize.UglifyJsPlugin()
  ]
}
