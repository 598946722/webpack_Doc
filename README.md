## webpack4+ 教程

```
本教程基于 webpack4.0+，需要下载 webpack 及 webpack-cli
官网的基础配置文件默认名为 webpack.config.js
```

### 项目结构

```
--- webpack_Doc 项目目录名
    --- src 开发环境项目目录
    --- dist 开发环境打包后的文件目录
        --- index.html 页面入口
        --- main.bundle.js 打包后的 js 文件
--- release 生产环境打包后的文件目录
--- build webpack 配置项
--- package.json 模块包及命令配置
--- tsconfig.json typescript环境参数属性配置
--- .babelrc 用于配置webpack中babel-loader option属性
```

### 入口

1. 单入口

单入口无法自定义名字，默认生成文件名为 main

```
entry 用于设置项目入口文件

webpack.config.js 配置如下：
const config = {
   entry: '' // 入口文件地址
}
```

2. 多入口

```
entry 用于设置项目入口文件

webpack.config.js 配置如下：
const config = {
   entry: {
      main: 'main.js',
      index: 'index.js'
   }
}
```

### 出口

1. path 模块依赖

出口依赖 path 模块进行寻址，所以在配置文件中需要引入 path 模块

```
webpack.config.js 配置如下：
const path = require('path');
```

2. 单出口

```
webpack.config.js 配置如下：
const config = {
   entry: '', // 入口文件地址
   output: {
      filename: '',  // filename 用于设置出口文件的名
      path: path.reslove(__dirname, ''),  // path 用于设置出口的地址
   }
}
```

3. 多出口

```
webpack.config.js 配置如下：
const config = {
   entry: '', // 入口文件地址
   output: {
      filename: '[name].bundle.js',  // 接收入口名，自动生成同名的出口文件
      path: path.reslove(__dirname, ''),  // path 用于设置出口的地址
   }
}
```

### 配置当前环境

```
在webpack4 + 中需要设置模式，以区分是开发环境还是生产环境，配置非常简单：

mode: 'development' // 开发模式
mode: 'production' // 生产模式
mode: 'none' // 不设置模式

mode的作用用于预设一些基础配置，在webpack 4- 版本中，很多基础配置需要自己手动处理，配置冗余且代码量多。
```

## loader

```
JS 中无法识别/加载 样式、预处理文件、图片、字体等文件，需要一些加载器（loader）去处理这些内容。

```

### 样式 loader

```
样式loader有两个：css-loader、style-loader 用于处理样式模块引用和内嵌的样式片段，两个模块需要独立安装

webpack.config.js 配置如下：
// css-loader
{
   test: /\.css$/i,
   exclude: /\.lazy\.css$/i,
   use: ["style-loader", "css-loader"]
},
// style-loader
{
   test: /\.lazy\.css$/i,
   use: [
      { loader: "style-loader", options: { injectType: "lazyStyleTag" } },
      "css-loader"
   ]
},
```

### url-loader

```
我们不能像写HTML一样直接在JS中写（绝对）路径地址，所以需要利用 url-loader 帮助我们去查询路径地址，以便找到所需要的文件。

webpack.config.js 配置如下：
// url-loader
{
   test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif)\??.*$/,
   use: [
      {
      loader: "url-loader",
      options: {
         limit: 8192
      }
      }
   ]
}
```

### file-loader

```
仅有 url-loader 是不够的，我们查询到文件之后需要让文件加载出来，就需要用到file-loader

webpack.config.js 配置如下：
// file-loader
{
   test: /\.(png|jpe?g|gif)$/i,
   loader: "file-loader",
   options: {
      name(file) {
      if (process.env.NODE_ENV === "development") {
         return "[path][name].[ext]";
      }
      return "[contenthash].[ext]";
      }
   }
},
```

### ts-loader

```
作用： ts-loader主要为了让项目支持ts语法

1. 项目文件必须全部以ts为后缀

2. entry入口文件后缀修改为ts

3. ts-loader配置项：
   {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
   }

4. 新增 tsconfig.json文件，配置项如下：
   {
      "compilerOptions": {
         "outDir": "./dist/",
         "noImplicitAny": true,
         "module": "es6",
         "target": "es5",
         "jsx": "react",
         "allowJs": true
      }
   }
```

## babel

### babel-loader

```
babel-loader 的目的是解决老版本浏览器不支持新的JS特性，针对新特性进行语法降级，或者利用polyfill进行兼容处理JS。

webpack.config.js 配置如下：
// babel-loader
{
   test: /\.m?js$/,
   exclude: /(node_modules|bower_components)/,
   use: {
      loader: "babel-loader"
   }
},
```

### .babelrc

```
因为babel需要配置的地方较多，我们可以通过两种方式配置babel-loader的属性

1. 通过webpack中的option属性进行拓展

2. 在根目录创建 .babelrc文件进行配置

因为涉及的babel配置较多，为了方便维护和更改，我们建议用.babelrc文件进行配置
```

### babel 拓展

1. @babel/preset-env

```
@babel/preset-env是一个智能预设，允许您使用最新的JavaScript

.babelrc 配置如下：
[
   "@babel/preset-env",
   {
      "useBuiltIns": "usage",
      "corejs": "3",  // 核心JS支持（polyfill）
      "targets": {  // 浏览器版本设置
         "edge": "17",
         "firefox": "60",
         "chrome": "67"
      }
   }
   ],
   ["@babel/preset-react"]
],
```

2. @babel/preset-react

```
react 配置支持

.babelrc 配置如下：
"presets": [
   ["@babel/preset-react"]
],
"env": {
   "development": {
      "presets": [
      [
         "@babel/preset-react",
         {
            "development": true
         }
      ]
      ]
   }
},
```

3. 插件

```
.babelrc 配置如下：
"plugins": [
   [
   "@babel/plugin-proposal-class-properties", // 支持class类
   {
      "loose": true
   }
   ],
   [
   "@babel/plugin-transform-arrow-functions", // 箭头函数支持
   {
      "spec": true
   }
   ]
]
```

## devServer

```
用于启动一个基于nodejs的本地服务

配置项：
devServer: {
   contentBase: path.join(__dirname, "../dist"),
   index: "../dist/index.html",
   compress: true,
   port: 9000,
   open: true,
   hot: true
}

通过 webpack-dev-server --config 进行server启动
```

### SourceMap

```
因为打包后的文件代码被压缩混淆了，所以在webpack打包后的文件中进行调试的话非常困难，SourceMap的作用就是让我们能够在
调试的时候找到想要调试的代码段。

区别开发环境与生产环境

   a. 开发环境配置
   devtool: "cheap-module-eval-source-map"

   b. 生产环境配置
   devtool: "cheap-module-source-map"

ts中tsconfig有专门用于配置ts的source-map
```

### 配置拆分与合并

```
在大型项目中，涉及大量的配置项，根据环境不同需要设置不同的文件配置。如果重复地去进行环境配置，维护成本会增加。
所以我们可以根据需求，把一些公共项给拆分出来单独进行维护。
```

1. 拆分配置

```
--- webpack
    --- webpack.base.config.js  公共配置项
    --- webpack.dev.config.js  开发环境配置
    --- webpack.prod.config.js  生产环境配置
    --- webpack.react.config.js  react 环境配置
```

2. 合并配置

```
webpack-merge 模块可以实现webpack配置模块合并

实现如下：

// 开发环境配置项
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

let config = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist")
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    index: "../dist/index.html",
    compress: true,
    port: 9000,
    open: true,
    hot: true
  }
};

// 合并配置项
module.exports = merge(config, baseConfig);
```

### 区分开发模式和发布模式

### 自定义命令配置

1. cmd 手动启动

```
webpack-cli --config
```

2. 在 package.json 中进行命令配置

```
"scripts": {
   "start": "webpack-dev-server --config ./build/webpack.dev.config.js",
   "react": "webpack-dev-server --config ./build/webpack.react.config.js",
   "publish": "webpack-cli --config ./build/webpack.prod.config.js",
   "test": "echo \"Error: no test specified\" && exit 1"
}
```

## 版本语法区分

1. @模块前缀

```
webpack4 + 的版本与早期版本相比，最大的区别是 大部分依赖模块都需要增加一个 @前缀
```

2. webpack 与 webpack-cli

```
webpack4+ 版本拆分出 webapck与webapck-cli
webapck-cli 专门用于打包命令等
webapck作为功能模块存在

webpack4- 版本中打包直接通过webapck实现，功能未拆分
```

### webpack打包会出现的问题

### 关于事件轮询

```
因为nodeJS和ES6的模块加载机制不同，‘commonjs’ 的 require 和 import 的区别是 requre需要等页面加载完才进行导入，
而import则是立即加载，使得一部分通过npm下载直接拿来用的loader或者插件会直接导致样式或者js加载异常，渲染顺序有误，
这边在进行项目开发的时候还是需要稍微注意下的。
```

### 样式拆分/压缩/优化

```
// 配置项
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
{
   //解析.scss文件
    test: /\.(sa|sc|c)ss$/,
    use: [
        'css-hot-loader',
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
}

```

### 按需加载

```
待完善
```

## webapck5新特性介绍

```
1. node必须升级到 8.0以上的版本

2. 目前还在alpha版本，如果想要尝鲜安装可以：
   npm install webpack@next —save-dev  
   npm run dev

3. 在开发模式中可以启用id命名的块替代 Magic Comments

4. 编译速度提高

5. 打包后文件体积是4+版本的 一半甚至三分之一

6. Node.js polyfills 自动被移除
```
