const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dists',
    filename: 'index.bundle.js'
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}