module.exports = {
    publicPath: './',
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        open: true,
        host: "localhost",
        port: 8080, // 端口号
        proxy: { //配置多个跨域
            '/api': {
                target: "http://121.4.85.6:9000",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/admin-and-problem-service': {
                target: "http://139.224.164.68:9590",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/admin-and-problem-service': ''
                }
            },
            '/doctor-service': {
                target: "http://139.224.164.68:8788",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/doctor-service': ''
                }
            },
            '/patient-service': {
                target: "http://192.168.43.147:8891",
                target: "http://121.4.85.6:8891",
                pathRewrite: {
                }
            },
        }
    }
}