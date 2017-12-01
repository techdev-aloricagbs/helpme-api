const request = require('superagent');
const { url } = require('config/servicenow');
const ApiError = require('src/ApiError');

module.exports = class {

  constructor(user) {
    this.serviceNowUser = user;
  }

  async execute(accessToken, incidentNumberFilter) {
    const incidentUrl = `${url}/api/now/table/incident`;
    let query = 'u_application_source=helpme';
    query += !this.serviceNowUser.roles.includes('service_desk') && `^caller_id=${this.serviceNowUser.sys_id}`;
    try {
      const res = await request.get(incidentUrl)
        .query({
          sysparm_query: incidentNumberFilter ? `${query}^numberLIKE${incidentNumberFilter}` : query,
        })
        .set('Authorization', `Bearer ${accessToken}`);
      return res.body.result;
    } catch (err) {
      console.log(err);
      switch (err.status) {
        case 401:
          throw new ApiError('InvalidTokenError', 'Invalid token', err.status);
        default:
          throw new ApiError('ServiceNowError', err.body.error_description, err.status);
      }
    }
  }

};
