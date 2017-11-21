const request = require('superagent');

const { url, client } = require('config/servicenow');

class Authenticator {

  static async execute(params) {
    const data = Object.assign({
      grant_type: 'password',
      client_id: client.id,
      client_secret: client.secret,
    }, params);
    const res = await request.post(`${url}/oauth_token.do`)
      .type('form')
      .send(data);
    return res.body;
  }
}

module.exports = Authenticator;
