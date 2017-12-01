const request = require('superagent');
const { url } = require('config/servicenow');
const ApiError = require('src/ApiError');

class IncidentCreator {

  static async execute(params, accessToken) {
    const incidentUrl = `${url}/api/now/table/incident`;
    try {
      const res = await request.post(incidentUrl)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(params);
      return res.body.result;
    } catch (err) {
      switch (err.status) {
        case 401:
          throw new ApiError('InvalidTokenError', 'Invalid token', err.status);
        default:
          throw new ApiError('ServiceNowError', err.body.error_description, err.status);
      }
    }
  }

}

module.exports = IncidentCreator;
