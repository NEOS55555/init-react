const path = require('path')
const { override, adjustStyleLoaders, addWebpackAlias, setWebpackOptimizationSplitChunks } = require("customize-cra");


/*setWebpackOptimizationSplitChunks({
   entry: [
    paths.appIndexJs,
  ].filter(Boolean), 
  // output: {
    // path: isEnvProduction ? paths.appBuild : undefined,
    filename: 'js/app.js',
    // publicPath: '//localhost:3000',
    chunkFilename: '[name].[chunkhash:8].js',
    // jsonpFunction: `webpackJsonp${appPackageJson.name}`,
    library: 'my-app',
    libraryTarget: 'umd'
  // },

})*/

const addCustomize = () => config => {
  // 关闭sourceMap
  config.devtool = false;
  // 配置打包后的文件位置
  // config.output.path = __dirname + '../dist/demo/';
  config.output.publicPath = '//localhost:3000';
  config.output.filename = 'app.js';
  // publicPath: '//localhost:3000',
  config.output.chunkFilename = '[chunkhash:8].js';
  // jsonpFunction: `webpackJsonp${appPackageJson.name}`,
  config.output.library = 'my-app';
  config.output.libraryTarget = 'umd'

  return config;
}

module.exports = {
  webpack: override(
    adjustStyleLoaders(rule => {
      if (rule.test.toString().includes("scss")) {
        rule.use.push({
          loader: require.resolve("sass-resources-loader"),
          options: {
            resources: "./src/assets/css/default.scss" //这里是你自己放公共scss变量的路径
          }
        });
      }
    }),
    addWebpackAlias({
      '@': path.resolve('src'),
    }),
    // addCustomize()
    
  ),
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      // 关闭主机检查，使微应用可以被 fetch
      config.disableHostCheck = true;
      // 配置跨域请求头，解决开发环境的跨域问题
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      // 配置 history 模式
      config.historyApiFallback = true;

      return config;
    };
  },


}



/*module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve('src'),

  };
  // console.log(config)
  return config;
}*/