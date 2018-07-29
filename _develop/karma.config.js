
module.exports = config => {
  config.set({
    basePath: '../',
    urlRoot: '/karma/',
    port: 8989,
    files: [
      { pattern: 'dist/test.js', nocache: true },
    ],
    frameworks: ['jasmine'],
    reporters: ['progress'],
    colors: true,
    autoWatch: false,
    singleRun: true,
    // browsers: ['Chrome'],
    browsers: ['ChromeCanary'],
    client: {
      useIframe: false,
    },
  })
}