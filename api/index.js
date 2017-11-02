const express = require('express');

const attachMiddlewares = require('./attach-middlewares');
const routes = require('./routes');

const app = express();
attachMiddlewares(app);
app.use(routes);


module.exports = app;
