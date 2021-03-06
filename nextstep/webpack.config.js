const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/app.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js'
  },
  module: {
      loaders: [{
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(jpg|png|gif|svg|mp4)$/,
        loader: 'url-loader'
      },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
  watch: true
}
