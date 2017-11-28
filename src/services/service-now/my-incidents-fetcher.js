const request = require('superagent');
const querystring = require('querystring');
const { url } = require('config/servicenow');

module.exports = class {

  static async execute(accessToken, incidentNumberFilter) {
    const incidentUrl = `${url}/api/now/table/incident`;
    const formattedUrl = incidentNumberFilter ? `${incidentUrl}?sysparm_query=numberLIKE${incidentNumberFilter}` : incidentUrl;
    const res = await request.get(formattedUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    return res.body.result;
  }

};
