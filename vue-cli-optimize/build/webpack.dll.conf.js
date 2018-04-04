//区分第三方依赖和业务代码
//webpack.dll.conf.js 专门打包第三方依赖
const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: {
    vue:["vue","vue-loader"],
    ui:["element-ui"]
  }
}
