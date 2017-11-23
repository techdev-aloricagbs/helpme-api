const request = require('superagent');
const { url } = require('config/servicenow');

class OauthCredentialsFetcher {

  static async execute(accessToken) {
    const incidentUrl = `${url}/api/now/table/oauth_credential?sysparm_query=token=${accessToken}`;
    const res = await request.get(incidentUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    return res.body.result[0];
  }

}

module.exports = OauthCredentialsFetcher;
