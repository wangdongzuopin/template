const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
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
    publicPath :'./'
};