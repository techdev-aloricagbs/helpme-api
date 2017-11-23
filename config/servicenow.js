const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  url: `https://${process.env.SERVICENOW_INSTANCE}.service-now.com`,
  admin: {
    username: process.env.SERVICENOW_ADMIN_USERNAME,
    password: process.env.SERVICENOW_ADMIN_PASSWORD,
  },

  client: {
    id: process.env.SERVICENOW_CLIENT_ID,
    secret: process.env.SERVICENOW_CLIENT_SECRET,
  },

};
