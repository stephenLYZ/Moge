const path = require('path')
const webpack = require('webpack')
const pkg = require('../package.json')

const baseConfig = {
  mode: 'development',
  context: path.resolve(__dirname, '..'),
  entry: {
    'moge.js': './src/index.js',
    'test.js': './test/index.js'
  },
  output: {
    filename: '[name]',
    library: 'Moge',
    libraryExport: 'default',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../dist/'),
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    targets: {
                      browsers: [
                        'last 2 Chrome major versions',
                        'last 2 Firefox major versions',
                        'last 2 Safari major versions',
                        'last 2 Edge major versions',
                        'last 2 iOS major versions',
                        'last 2 ChromeAndroid major versions',
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: false,
    port: 9000,
    stats: 'minimal',
    disableHostCheck: true,
  },
}

module.exports = env => {
  if (env && env.prod) {
    const { devServer, ...prodConfig } = baseConfig;
    return {
      ...prodConfig,
      mode: 'production',
      entry: { 'moge.min.js': './src/index.js' },
      devtool: 'source-map',
    }
  }
  return baseConfig
}