### webpack3.0 整理
>webpack3 demo
api详解、通用配置、单页spa&&多页应用demo、vue-cli优化

### documentation
> 教程直接跳转：

```
cd docs 详细配置项解析
```
参考资料
* [webpack中文官网](https://doc.webpack-china.org)
* [阮一峰webpack3教程](https://github.com/ruanyf/webpack-demos)
* [「JI · 记小栈」的demo](https://github.com/MaelWeb/JI-Blog)

> bash

![](https://img.shields.io/badge/node-6.10.0-blue.svg)
![](https://img.shields.io/badge/webpack-3.1.0-green.svg)
![](https://img.shields.io/badge/express-4.16.3-red.svg)
![](https://img.shields.io/badge/vue-2.5.2-brightgreen.svg)
- 基本配置demo
```
cd base-conf-demo
```

- install dependencies
```
$ npm install
```

- 启动服务 webpack-dev-server
```
$ npm run dev
```

- build for production with minification
```
$ npm run build
```
> more

```
cd vue-cli-optimize-demo //vue脚手架优化demo
cd muti-page-demo // 多页应用，多入口demo
```

### task
- [ ] **脚手架demo**
    - [x] 基本demo（单页spa）常用配置
    - [x] 完善多页应用打包
        - [x] 多页单配置
        - [x] 多页多配置
    - [ ] 改进 vue-cli 配置，实现打包优化和个性化开发
    - [ ] 优化打包速度（DllPlugin）
    - [ ] 升级业务场景，拓展plugins
    - [ ] 升级至webpack4
- [ ] **文档docs**
    - [x] 常用api整理
    - [ ] 高阶api整理
    - [ ] webpack3搭建个性化vue脚手架
    - [ ] webpack4和webpack3版本变迁

如需转载请注明作者 https://github.com/dingjiamughal/webpack3.0-note
