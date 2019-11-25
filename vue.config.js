module.exports = {
  publicPath: process.env.NODE_ENV === 'production' && process.env.PUBLIC_PATH
    ? process.env.PUBLIC_PATH
    : '/',
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8000"
      }
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500
    }
  }
};
