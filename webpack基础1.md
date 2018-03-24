### webpack-note

### webpack支持的三种模块化模式
```js
//es module
import util from 'util'
export default () => {}

//commonjs
var util = require('util')
module.exports = () => {};

// amd
require(['util'],(util)={})
```

### webpack.config.js

commonjs规范
```js
module.exports = {
  entry:{
    app:"./app.js"
  },
  output:{
    filename:"[name].[hash:5].js"
  }
}
```

### babel编译js

npm i babel-loader babel-core --save-dev
npm i babel-preset-env --save-dev // es2015 es2016 es2017 env babel-preset-react babel-preset-state 0-3

```js
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

babel polyfill //垫片
babel runtime transform
编译es6

npm i babel-plugin-transform-runtime --save-dev
npm i babel-runtime babel-polyfill --save

import "babel-polyfill"

```js
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

### 编译typescript
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
```js
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

### webpack.optimize.CommonsChunkPlugin 提取公共代码
```js
{
  plugins:[
    new webpack.optimize.CommonsChunkPlugin(options)
  ]  
}

```
options配置项
`name` [name,names]
`filename`
`minChunks`
`chunks`
`children` `deepChildren`
`async`

业务场景
`spa` `spa+第三方依赖` `多页应用+第三方依赖+webpack生成代码`

```js
const webpack = require("webpack")
const path = require("path")

module.exports = {
  entry:{
    "pageA":"./src/pageA"
  },
  output:{
    path:path.resolve(_dirname,"./dist"),
    filename:"[name].bundle.js",
    chunkFilename:"[name].chunk.js"
  }
}
```
