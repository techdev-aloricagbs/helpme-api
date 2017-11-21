const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  url: `https://${process.env.SERVICENOW_INSTANCE}.service-now.com`,

  client: {
    id: process.env.SERVICENOW_CLIENT_ID,
    secret: process.env.SERVICENOW_CLIENT_SECRET,
  },

};
