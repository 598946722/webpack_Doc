// 基础配件 用于设置公共配置

module.exports = {
  module: {
    rules: [
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
      // babel-loader
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
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
    ]
  }
};
