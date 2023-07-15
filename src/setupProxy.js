const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy configuration
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://check-consulting.net:8080",
      changeOrigin: true,
        onProxyReq(proxyReq, req, res) {
            console.log('onProxyReq was fired', proxyReq.path);
        }
    })
  );
};
