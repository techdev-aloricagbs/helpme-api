const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  instance: process.env.SERVICENOW_INSTANCE,
  username: process.env.SERVICENOW_USERNAME,
  password: process.env.SERVICENOW_PASSWORD,

  client: {
    id: process.env.SERVICENOW_CLIENT_ID,
    secret: process.env.SERVICENOW_CLIENT_SECRET,
  },

};
