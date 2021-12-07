var webpack=require('webpack');
module.exports = {
    css: {
        sourceMap: false,
        loaderOptions: {
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 192
              })
            ]
          }
        },
      },
      publicPath :'./'
}