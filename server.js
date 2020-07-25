const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/dist')));

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const devWebpack = require('./config/webpack.js');
  const webpackMiddleware = require('webpack-dev-middleware');
  const compiler = webpack(devWebpack);
  app.use(webpackMiddleware(compiler, {
    publicPath: '/',
    stats: {
      modules: false,
      assets: false,
    },
  })).get('*', (req, res, next) => {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    return compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err);
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  app.get('*', (req, res) => res.sendFile(__dirname + '/dist/index.html'));
}

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err)
});

module.exports = app;