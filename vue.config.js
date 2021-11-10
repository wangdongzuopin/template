module.exports = {
    productionSourceMap: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/less/variables.less') // 变量文件位置
            ]
        }
    },
}