const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "../examples2/src/index.html"),
  filename: "./index.html"
});
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  entry: path.join(__dirname, "../examples2/src/index.js"),
  output: {
    path: path.join(__dirname, "../examples2/dist"),
    filename: "bundle[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  context: path.join(__dirname, '../examples2'),
  plugins: [
    htmlWebpackPlugin, 
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'static' }
      ]
    })
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    port: 3001
  },
  devtool: 'source-map'
};