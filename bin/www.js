const dotenv = require('dotenv');

const path = require('app-module-path');

path.addPath(process.cwd());

const mongoose = require('mongoose');
const { url } = require('config/database');

dotenv.config();

require('../src');
const api = require('../api');
const { port } = require('config/app');

mongoose.connect(url);

api.listen(port, () => {
  console.log(`Running app on port ${port}`); // eslint-disable-line
})
.on('error', (err) => {
    console.log(err); // eslint-disable-line
});

