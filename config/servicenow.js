const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  username: process.env.SERVICENOW_USERNAME,
  password: process.env.SERVICENOW_PASSWORD,
  url: `https://${process.env.SERVICENOW_INSTANCE}.service-now.com`,

  client: {
    id: process.env.SERVICENOW_CLIENT_ID,
    secret: process.env.SERVICENOW_CLIENT_SECRET,
  },

};
