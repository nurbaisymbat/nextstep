const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/client/src/app.jsx'),
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js'
  },
  module: {
<<<<<<< Updated upstream
    loaders: [
      {
=======
      loaders: [{
>>>>>>> Stashed changes
        test: /\.jsx?$/,
        include: path.join(__dirname, '/client/src'),
        loader: 'babel',
        query: {
<<<<<<< Updated upstream
          presets: ["react", "es2015"]
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      }

    ]
=======
          presets: ["react", "es2015"]}
      },
      {
      test: /\.(jpg|png|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 25000,
      },
    }],
>>>>>>> Stashed changes
  },
  watch: true
}
