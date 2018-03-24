# webpack3 基础1

## webpack支持的三种模块化模式
```javascript
//es module
import util from 'util'
export default () => {}

//commonjs
const util = require('util')
module.exports = () => {};

// amd
require(['util'],(util)={})
```

## webpack.config.js

commonjs规范

```javascript
module.exports = {
  entry:{
    app:"./app.js"
  },
  output:{
    filename:"[name].[hash:5].js"
  }
}
```

## babel编译js

npm i babel-loader babel-core --save-dev npm i babel-preset-env --save-dev // es2015 es2016 es2017 env babel-preset-react babel-preset-state 0-3

```javascript
module:{
  rules:[
    {
    test:/\.js$/,
    use:{
      loader:"babel-loader",
      options:{
        presets:["@babel/preset-env",{
          targets:{
            browers:[">1%","last 2 versions"]
          }
        }]
      }
    },
    exclude:"/node_modules"
  }
 ]
}
```

babel polyfill //垫片 babel runtime transform 编译es6

npm i babel-plugin-transform-runtime --save-dev npm i babel-runtime babel-polyfill --save

import "babel-polyfill"

```javascript
// .babelrc
{
  "presets":[
    ["@babel/preset-env",{
      "targets":{
        "browers":["last 2 versions"]
      }
    }]
  ]
}
```

## 编译typescript

npm i typescript ts-loader awesome-typescript-loader --save-dev

```json
//tsconfig.json
{
  "compilerOptions":{
    "module":"commonjs",
    "target":"es5",
    "allowJs":true
  },
  "include":[
    "./src/*"
  ],
  "exclude":[
    "./node_modules"
  ]
}
```

```javascript
  // webpack.conf.js
module:{
  rules:[
    {
      test:/\.tsx?$/,
      use:{
        loader:"ts-loader"
      }
    }
  ]
}
```

## webpack.optimize.CommonsChunkPlugin 提取公共代码

CommonsChunkPlugin打包公共代码让浏览器识别到缓存文件，在多页应用中提高第二次之后的读写速度。

```javascript
{
  plugins:[
    new webpack.optimize.CommonsChunkPlugin(options)
  ]  
}
```

options配置项
`name` [name]数组类型</br>
`filename` </br>
`minChunks` 自动识别：模块最少出现次数，自动作为打包文件<br>
`chunks` 提取代码的范围<br>
`children` `deepChildren` `async`

业务场景 `spa` `spa+第三方依赖` `多页应用+第三方依赖+webpack生成代码`

```javascript
// CommonsChunkPlugin基本配置
// pageA.js 中引用了subA.js和sub.js和lodash，subA和subB中引用module.js
// task：进行代码分割的基础配置
const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry:{
    "pageA":"./src/pageA",
    "pageB":"./src/pageB",
    "vendor":["lodash"]
  },
  output:{
    path:path.resolve(_dirname,"./dist"),
    filename:"[name].bundle.js",
    chunkFilename:"[name].chunk.js"
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:"['vendor','manifest']",
      minChunks:2
    }),
    //task提取公共代码module.js并异步加载用async
    new webpack.optimize.CommonsChunkPlugin({
      async:"async-common",
      children：true,//向下查找
      minChunks:2
    })
  ]
}
```

配置了`minChunk`必须是多entry，CommonsChunkPlugin只能识别多entry的情况

## 代码分割和懒加载

根据不同需求对js公共文件进行打包和按需加载

> 代码分割的场景 分离 业务代码、第三方依赖 分离 业务代码、公共代码、第三方依赖 分离 首次加载、访问后加载（多页应用）

`require.ensure` `require.include`

```javascript
const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry:{
    "pageA":"./src/pageA",
  },
  output:{
    path:path.resolve(_dirname,"./dist"),
    publicPath:"./dist/",//代码发布路径，最终使发布到服务器的地址
    filename:"[name].bundle.js",
    chunkFilename:"[name].chunk.js"
  },
  // plugins:[
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name:"common",
  //     minChunks:2
  //   })
  // ]
}
// pageA.js 中引用了subA.js和sub.js和lodash，subA和subB中引用module.js
// 任务：将第三方lodash进行代码分割
//pageA.js中
require.ensure(["lodash"],()=>{//require加载到页面
  const _=require("lodash")//执行lodash
},"vendor")

// 分离细分
//task：将subA.js,subB.js进行按需分离
if(true){
  require.ensure(["./subA"],()=>{
    const subA = require("subA")
  },"subA")
} else {
  import(/* webpackChunkName:'subpageB' */"./subB")
    .then(subB => { //  import方法，直接执行，webpack3新功能
    console.log(subB)
  })
}

此时，发现在subA和subB中的module.js没有被单独打包成一个文件。这时候就需要在pageA.js中
require.include("./module.js")
module文件在subA和subB.js中剔除，被单独提取到pageA.js
```

## 处理css
webpack处理css方式是通过webpack的css-loaderdui css文件进行打包，用js来对css进行加载

需要的加载器
`style-loader` 创建link标签</br>
`css-loader` 能在js引入css文件
>cnpm install css-loader style-loader --save-dev

```js
  //在js中
  import 'xxx.css'

  //webpack.config.js
  const path=require("path")
  module.exports={
    entry:{
      app:"./src/app.js"
    },
    output:{
      path:path.resolve(__dirname,"./dist"),
      publicPath:"./dist/ ",
      filename:"[name].bundle.js"
    },
    module:{
      rules:[{
        test:/\.css$/,
        use:[{//顺序是先让js中支持import css再放到页面中进行加载
          loader:"style-loader",
          options:{
            insertInfo:"#app",// 当做style标签打包在id="app"的dom内
            singleton:true,//合并样式
            transform:"./css.transform.js"
          }
        },{
          loader:"css-loader",
          options:{
             modules:true,//允许在css文件中引入别的css文件中的模块 `compire`
             localIdentName:'[path][name]_[local]_[hash:base64:5]'
          }
        }]
      }]
    }
  }
```
style-loader中的transform参数的作用
单独在根目录下创建文件，`css.transform.js`在此文件中可以进行js对css的逻辑处理，比如获取window对象，判断浏览器版本对所有的css文件进行操作
```js
// css.transform.js
module.exports= res => {
  console.log(css)//能够log出所有的css文件
  if(window.innerWidth >= 768){
    return css.replace("red","green")
  }else {
    return css.replace("red","blue")
  }
}
```

## 配置less/sass
>cnpm install less less-loader sass sass-loader

```js
modules:{
  rules:[{
    test:/\.less$/,
    use:[{
      loader:"less-loader"
    }]
  }]
}
```
