const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  clientToken: process.env.CLIENT_TOKEN,
  port: process.env.PORT || 3000,

  env: process.env.NODE_ENV || 'Development',

};
