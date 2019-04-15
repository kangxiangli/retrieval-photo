const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    filenameHashing: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    transpileDependencies:[],//如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来
    productionSourceMap:false,
    devServer: {
        host:'0.0.0.0',
        port:8080,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
          "/v1": {
            target: "http://10.199.2.47:10210/",
            ws: false, // 是否启用websockets
            changOrigin: true,
            pathRewrite: {
              "^/v1": "/"
            }
          }
        }
    },
    css: {
        extract: true,// 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false,// 开启 CSS source maps
        loaderOptions: {},// css预设器配置项
        modules: false// 启用 CSS modules for all css / pre-processor files.
    },
    configureWebpack: { //调整 webpack 配置
        plugins: [],
        module: {
            rules: [
                {
                    test: /\.(svg)(\?.*)?$/,
                    use: [
                        {
                            loader: "svg-sprite-loader",
                            options: {
                                symbolId: "icon-[name]"
                            }
                        }
                    ]
                }
            ]
        }
    },
    pluginOptions: {// 第三方插件配置
        // ...
    }

};
