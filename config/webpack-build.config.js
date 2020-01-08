const path = require('path');
const webpack = require('webpack');
const pkg = require('../package');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}

 Copyright (c) 2019 ${pkg.author}
 Released under the ${pkg.license} license

 Date: ${now.toISOString()}
`;


module.exports = {
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../build"),
    filename: `${pkg.name}.min.js`
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin(banner),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};