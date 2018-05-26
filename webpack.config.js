const path = require('path')
module.exports = {
  devtool: 'source-map',
  entry: './src/demo/tetris/index.js',
  output: {
    path: __dirname + '/dists',
    filename: 'tetris.bundle.js'
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