require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const app = express();
const route = require('./route');

app.set('view engine', 'ejs');
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api', route);
app.use(express.static(path.join(__dirname, '/dist')));

console.log('Setting up environment. Please wait..');
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