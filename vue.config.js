module.exports = {
  publicPath: process.env.NODE_ENV === 'production' && process.env.PUBLIC_PATH
    ? process.env.PUBLIC_PATH
    : '/',
  transpileDependencies: ["vuetify"],
  devServer: {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 500
    }
  }
};
