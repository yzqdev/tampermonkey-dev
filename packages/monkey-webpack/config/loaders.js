const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssLoader = {
  test: /\.css$/,
  use: [
    // {
    //   loader: MiniCssExtractPlugin.loader
    // },
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
      options: {
        config: {
          path: path.join(__dirname, "./postcss.config.js"),
        },
      },
    },
  ],
};
const csLoader = {
  test: /\.css$/,
  use: ["css-loader", MiniCssExtractPlugin.loader], // 从右向左解析
};
const sassLoader = {
  test: /\.scss$/,

  use: [
    {
      loader: "style-loader", // 将 JS 字符串生成为 style 节点
    },
    {
      loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
    },
    {
      loader: "sass-loader", // 将 Sass 编译成 CSS
    },
  ],
};
const fileLoader = {
  test: /\.(png|svg|jpg|gif)$/,

  type: "asset/inline",
};
const jsxLoader = {
  test: /\.jsx$/,
  exclude: /(node_modules)/,
  use: {
    loader: "babel-loader",
    options: {
      presets: ["@babel/preset-react"],
    },
  },
};
const svgLoader = {
  test: /\.svg$/,

  type: "asset/inline",
};

const jsLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: { presets: ["@babel/preset-env"] },
  },
};
const eslintLoader = {
  test: /\.js$/,
  enforce: "pre",
  exclude: /node_modules/,
  use: {
    loader: "eslint-loader",
    options: {
      configFile: path.join(__dirname, "../.eslintrc"),
    },
  },
};
const csvLoader = {
  test: /\.(csv|tsc)$/,
  use: [`csv-loader`],
};

const htmlLoader = {
  test: /\.html$/,
  type: "asset/source",
};

const xmlLoader = {
  test: /\.xml$/,
  use: ["xml-loader"],
};
const imageLoader = {
  test: /\.(png|jpg|jpeg|gif)$/,
  use: "url-loader?limit=1024&name=images/[name]_[hash].[ext]",
};

module.exports = {
  jsLoader,
  svgLoader,
  xmlLoader,
  imageLoader,
  csvLoader,
  csLoader,
  fileLoader,
  sassLoader,
  cssLoader,
  jsxLoader,
  htmlLoader,
};
