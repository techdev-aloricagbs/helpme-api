const axios = require('axios');
const querystring = require('querystring');

const { instance, client } = require('config/servicenow');

class Authenticator {

  static async execute(params) {
    const url = `https://${instance}.service-now.com/oauth_token.do`;
    const data = Object.assign({
      grant_type: 'password',
      client_id: client.id,
      client_secret: client.secret,
    }, params);
    console.log(url)
    const res = await axios.post(url, querystring.stringify(data));
    return res.data;
  }
}

module.exports = Authenticator;
