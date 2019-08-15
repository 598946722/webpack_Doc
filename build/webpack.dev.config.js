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
