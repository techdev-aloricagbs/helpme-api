const request = require('superagent');
const { url } = require('config/servicenow');
const ApiError = require('src/ApiError');
const UserRoleFetcher = require('src/services/service-now/user-role-fetcher');

module.exports = class {

  static async execute(sysId, accessToken) {
    const userUrl = `${url}/api/now/table/sys_user/${sysId}`;
    try {
      const res = await request.get(userUrl)
        .set('Authorization', `Bearer ${accessToken}`);
      try {
        const userRoles = await UserRoleFetcher.execute(sysId, accessToken);
        res.body.result.is_service_desk = userRoles.length > 0;
      } catch (err) {
        switch (err.name) {
          case 'AuthorizationError':
            res.body.result.is_service_desk = false;
            break;
          default:
            throw err;
        }
      }
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

};
