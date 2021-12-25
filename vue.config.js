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
                target: "http://100.78.182.86:9000",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/admin-and-problem-service': {
                target: "http://100.78.182.86:9590",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/admin-and-problem-service': ''
                }
            },
            '/doctor-service': {
                target: "http://100.78.182.86:8788",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/doctor-service': ''
                }
            },
            '/patient-service': {
                target: "http://100.78.182.86:8891",
                changeOrigin: true, //是否开启跨域
                ws: true, //websocket支持
                pathRewrite: {
                    '^/patient-service': ''
                }
            },
        }
    }
}