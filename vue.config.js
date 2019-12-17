module.exports = {
  publicPath: '/',
  transpileDependencies: ["vuetify"],
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500
    }
  }
};
