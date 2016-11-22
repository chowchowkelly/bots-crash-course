'use strict'; // Express.js Configuration

const logger          = require('morgan');
const bodyParser      = require('body-parser');
const config          = require('./globals')

module.exports = (app) => {

  app.use(logger('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(function (req, res, next) {
    res.header('Content-Type','application/json');
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    next();
  });

}
