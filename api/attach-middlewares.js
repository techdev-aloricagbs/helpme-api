const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const expressPromise = require('express-promise');
const cors = require('cors');
const { accessToken } = require('config/rollbar');
const { env } = require('config/app');

const Rollbar = require('rollbar');

const enabledEnvs = [
  'production',
  'staging',
];


module.exports = (app) => {
  app.use(bodyParser.json({ limit: '3mb' }));
  app.use(helmet());
  app.use(expressPromise());
  app.use(express.static('public'));
  app.use(cors());

  if (enabledEnvs.includes(env)) {
    const rollbar = new Rollbar({
      enabled: enabledEnvs.includes(env),
      accessToken,
      handleUncaughtExceptions: true,
      handleUnhandledRejections: true,
    });
    app.use(enabledEnvs.includes(env) || rollbar.errorHandler());
  }
};

