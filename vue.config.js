module.exports = {
        publicPath: "./",
        devServer: {
            overlay: {
                // 让浏览器 overlay 同时显示警告和错误
                warnings: true,
                errors: true,
            },
            open: true,
            host: "localhost",
            port: 8080, // 端口号
            proxy: {
                //配置多个跨域
                "/api": {
                    target: "http://localhost:8888",
                    // target: "http://100.78.144.140:9000",
                    changeOrigin: true, //是否开启跨域
                    ws: true, //websocket支持
                    pathRewrite: {
                        "^/api": "",
                    },
                    open: true,
                    host: "localhost",
                    port: 8080, // 端口号
                    proxy: { //配置多个跨域
                        '/api': {
                            target: "http://localhost:8888",
                            // target: "http://100.78.144.140:9000",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                            pathRewrite: {
                                '^/api': ''
                            }
                        },
                        '/pmservice': {
                            // target: "http://100.65.7.16:9003",
                            target: "http://192.168.189.1:9003",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                        },
                        '/amservice': {
                            // target: "http://100.65.7.16:9010",
                            target: "http://192.168.189.1:9010",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                        },
                        '/oiservice': {
                            // target: "http://100.65.7.16:9002",
                            target: "http://192.168.189.1:9002",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                        },
                        '/pimservice': {
                            // target: "http://100.65.7.16:9000",
                            target: "http://192.168.189.1:9000",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                        },
                        '/vtmservice': {
                            // target: "http://100.65.7.16:9004",
                            target: "http://192.168.189.1:9004",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                        },
                        '/pyservice': {
                            target: "http://localhost:8000",
                            //target: "http://192.168.189.1:8000",
                            changeOrigin: true, //是否开启跨域
                            ws: true, //websocket支持
                            pathRewrite: {
                                '^/pyservice': ''
                            }
                        },
                    }
                }
            }