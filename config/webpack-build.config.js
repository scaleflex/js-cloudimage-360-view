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
        use: [
          "style-loader",
          { loader: 'css-loader', options: { importLoaders: 1 } },
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-sass-loader',
            options: {
              options: {},
              ident: 'postcss',
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-preset-env')(),
                require('cssnano')()
              ]
            }
          },
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