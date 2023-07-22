const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  // Proxy configuration
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.PUBLIC_API_URL,
      changeOrigin: true,
      onProxyReq(proxyReq, req, res) {
        console.log("onProxyReq was fired", proxyReq.path);
      },
    })
  );
};
