const {merge} = require("webpack-merge");
const os=require('os');
const common = require("./webpack.common.js");
const utils=require('./webpack.utils')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(common, {

  mode:'development',
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        output: {
          comments: /==\/?UserScript==|^[ ]?@|eslint-disable|spell-checker/i,
        },
      },
      extractComments: false,
    }),],
  }


});
