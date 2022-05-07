module.exports = {
    publicPath: "./",
    devServer: {
        overlay: {
            // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true,
        },
      },
      "/pmservice": {
        // target: "http://100.65.7.16:9003",
        target: "http://100.65.7.16:9003",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
      },
      "/amservice": {
        // target: "http://100.65.7.16:9010",
        target: "http://100.65.7.16:9010",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
      },
      "/oiservice": {
        // target: "http://100.65.7.16:9002",
        target: "http://100.65.7.16:9002",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
      },
      "/pimservice": {
        // target: "http://100.65.7.16:9000",
        target: "http://100.65.7.16:9000",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
      },
      "/vtmservice": {
        // target: "http://100.65.7.16:9004",
        target: "http://100.65.7.16:9004",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
      },
      // "/upload": {
      //   // target: "http://100.65.7.16:9004",
      //   target: "http://100.65.7.16:8789",
      //   changeOrigin: true, //是否开启跨域
      //   ws: true, //websocket支持
      // },
      "/pyservice": {
        target: "http://localhost:8000",
        changeOrigin: true, //是否开启跨域
        ws: true, //websocket支持
        pathRewrite: {
          "^/pyservice": "",
        },
      },
    },
  },
};
