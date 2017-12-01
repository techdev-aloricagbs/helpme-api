const request = require('superagent');
const { url } = require('config/servicenow');
const ApiError = require('src/ApiError');

const serviceDeskRoleId = '9cb2ae3d68a3200020c283506e89c1d6';

module.exports = class {

  static async execute(userId, accessToken) {
    const userRoleUrl = `${url}/api/now/table/sys_user_has_role`;
    try {
      const res = await request.get(userRoleUrl)
        .query({
          sysparm_query: `role=${serviceDeskRoleId}^user=${userId}`,
        })
        .set('Authorization', `Bearer ${accessToken}`);
      return res.body.result;
    } catch (err) {
      console.log(err)
      switch (err.status) {
        case 403:
          throw new ApiError('AuthorizationError', 'User not authorized', err.status);
        case 401:
          throw new ApiError('InvalidTokenError', 'Invalid token', err.status);
        default:
          throw new ApiError('ServiceNowError', err.body.error_description, err.status);
      }
    }
  }

};
