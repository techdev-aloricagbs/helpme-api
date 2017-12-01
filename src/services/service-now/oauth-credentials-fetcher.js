const request = require('superagent');
const { url } = require('config/servicenow');
const ApiError = require('src/ApiError');

module.exports = class {

  static async execute(accessToken) {
    const incidentUrl = `${url}/api/now/table/oauth_credential`;
    try {
      const res = await request.get(incidentUrl)
        .query({
          sysparm_query: `token=${accessToken}`,
        })
        .set('Authorization', `Bearer ${accessToken}`);
      return res.body.result[0];
    } catch (err) {
      switch (err.status) {
        case 401:
          throw new ApiError('InvalidTokenError', 'Invalid token', err.status);
        default:
          throw new ApiError('ServiceNowError', err.body.error_description, err.status);
      }
    }
  }

};
