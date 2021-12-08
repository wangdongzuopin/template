const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
// const vuxLoader = require('vux-loader')

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*'],
                    })
                ]
            }
        }
    },
    // configureWebpack: config => {
    //     require('vux-loader').merge(config, {
    //         options: {},
    //         plugins: ['vux-ui']
    //     })
    // },
    publicPath: './'
};