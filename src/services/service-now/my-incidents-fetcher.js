const request = require('superagent');
const { url } = require('config/servicenow');

module.exports = class {

  static async execute(accessToken) {
    const incidentUrl = `${url}/api/now/table/incident`;
    const res = await request.get(incidentUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    return res.body.result;
  }

};
