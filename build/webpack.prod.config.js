// 生产环境配置项
const path = require("path");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config");

let config = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../release")
  },
  mode: "production",
  devtool: "cheap-module-source-map"
};

// 合并配置项
module.exports = merge(config, baseConfig);
