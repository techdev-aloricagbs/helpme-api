const dotenv = require('dotenv');

dotenv.config();

require('../src');
module.exports = require('../api');
