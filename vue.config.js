'use strict'
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const defaultSettings = require('./src/settings.js')
const path = require('path')
const name = defaultSettings.title || 'temp' // page title
const port = process.env.port || process.env.npm_config_port || 9999
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // publicPath: process.env.NODE_ENV === 'uat'?'/jidatest':'/',
  publicPath: process.env.ENV === 'staging'?'/jidatest':'/',
  // publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            "selectorBlackList": ["van-"] //排除vant框架相关组件
          })
        ]
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
};