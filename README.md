### webpack 插件


具体使用 在webpack.config 配置文件中

此项目也可以作为一个webpack 插件模板使用，免去查Api困惑

```
config.plugins.push(
      new CheckedWebpackPlugin({
        resultPath: path.resolve(__dirname, '../result.log'),
      }),
    );

```