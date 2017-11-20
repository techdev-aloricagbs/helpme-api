const dotenv = require('dotenv');
const mongoose = require('mongoose');

require('../src');

const { url } = require('config/database');

dotenv.config();

const api = require('../api');
const { port } = require('config/app');

mongoose.connect(url);

api.listen(port, () => {
  console.log(`Running app on port ${port}`); // eslint-disable-line
})
.on('error', (err) => {
    console.log(err); // eslint-disable-line
});

