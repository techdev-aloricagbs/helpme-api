const request = require('superagent');
const ApiError = require('src/ApiError');

const { url, client } = require('config/servicenow');

class Authenticator {

  static async execute(params) {
    const data = Object.assign({
      grant_type: 'password',
      client_id: client.id,
      client_secret: client.secret,
    }, params);
    try {
      const res = await request.post(`${url}/oauth_token.do`)
        .type('form')
        .send(data);
      return res.body;
    } catch (err) {
      switch (err.status) {
        case 401:
          throw new ApiError('InvalidLoginError', 'Username or password is incorrect', err.status);
        default:
          throw new ApiError('ServiceNowError', err.body.error_description, err.status);
      }
    }
  }
}

module.exports = Authenticator;
