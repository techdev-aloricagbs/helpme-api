const request = require('superagent');
const { url } = require('config/servicenow');

class IncidentCreator {

  static async execute(params, accessToken) {
    const incidentUrl = `${url}/api/now/table/incident`;
    const res = await request.post(incidentUrl)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(params);
    return res.body.result;
  }

}

module.exports = IncidentCreator;
