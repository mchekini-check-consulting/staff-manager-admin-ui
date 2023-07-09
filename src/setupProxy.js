const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // Proxy configuration
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://check-consulting.net",
      changeOrigin: true,
    })
  );
};
