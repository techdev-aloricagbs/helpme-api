const request = require('superagent');
const { url } = require('config/servicenow');

module.exports = class {

  static async execute(accessToken) {
    const incidentUrl = `${url}/api/now/table/oauth_credential`;
    const res = await request.get(incidentUrl)
      .query({
        sysparm_query: `token=${accessToken}`,
      })
      .set('Authorization', `Bearer ${accessToken}`);
    return res.body.result[0];
  }

};
