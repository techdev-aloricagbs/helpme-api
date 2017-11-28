const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const expressPromise = require('express-promise');
const cors = require('cors');
const { accessToken } = require('config/rollbar');

const Rollbar = require('rollbar');

const rollbar = new Rollbar({
  accessToken,
  handleUncaughtExceptions: true,
  handleUnhandledRejections: true,
});

module.exports = (app) => {
  app.use(bodyParser.json({ limit: '3mb' }));
  app.use(helmet());
  app.use(expressPromise());
  app.use(express.static('public'));
  app.use(cors());
  app.use(rollbar.errorHandler());
};

