# monkey-webpack

## 关于引入图片和html

见[https://webpack.js.org/guides/asset-modules/](https://webpack.js.org/guides/asset-modules/)

在 webpack5 之前，可能需要使用 raw-loader、file-loader、url-loader 来加载资源。

raw-loader：将文件作为字符串导入
file-loader：处理文件的路径并输出文件到输出目录
url-loader：有条件将文件转化为 base64 URL，如果文件大于 limit 值，通常交给 file-loader 处理。
在 webpack5+，以上方法已经过时了，webpack5 使用了“资源模块”来代替以上 loader。 官方是这样解释“资源模块”的。

```text
资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
```
 
而“资源模块”类型有四种。

- asset/resource： 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
- asset/inline： 导出一个资源的 data URI。之前通过使用 url-loader 实现。
- asset/source： 导出资源的源代码。之前通过使用 raw-loader 实现。
- asset： 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
