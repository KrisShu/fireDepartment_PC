// vue.config.js 配置说明
const webpack = require('webpack')
module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack:  {
    externals:  {
    // 全局常量定义出，也可以是window下的实例
    'AMap':  'AMap'  // 高德地图配置
    },
    plugins:[
      new webpack.ProvidePlugin({
        $:'jquery',
        jQuery:'jquery',
        'windows.jQuery':'jquery'
      })
    ]

  },
  devServer: {
    port: 8080, // 端口号
    host: "0.0.0.0",
    https: false, 
    open: false, //配置自动启动浏览器
    proxy: {//跨域配置
      "/api": {
        target: "http://fd.sctsjkj.com:5081",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api" //http://fd.sctsjkj.com:5081/api
        }
      }
    }
  }
};
