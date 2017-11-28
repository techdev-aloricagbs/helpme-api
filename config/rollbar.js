const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  accessToken: process.env.ROLLBAR_TOKEN,
};
