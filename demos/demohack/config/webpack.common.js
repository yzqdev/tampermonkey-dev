const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //这里必须这样写
const loaders = require("./loaders");
const { getBanner } = require("./webpack.utils");
const meta = require("./meta.json");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "demohack.dev.user.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: path.resolve(__dirname, "../build"),
    // 在script标签上添加crossOrigin,以便于支持跨域脚本的错误堆栈捕获
    crossOriginLoading: "anonymous",
  },
  plugins: [
    // new CleanWebpackPlugin(), //这里注意要大写啊
    new webpack.BannerPlugin({
      banner: getBanner(meta),
      raw: true,
      entryOnly: true,
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "../src")],
    alias: {
      components: path.resolve(__dirname, "/src/components"),
    },
  },

  module: {
    rules: [
      loaders.cssLoader,
      loaders.sassLoader,
      loaders.fileLoader,
      loaders.htmlLoader,
    ],
  },
};
