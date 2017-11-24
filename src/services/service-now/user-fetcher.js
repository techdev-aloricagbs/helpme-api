const request = require('superagent');
const { url } = require('config/servicenow');

module.exports = class {

  static async execute(sysId, accessToken) {
    const userUrl = `${url}/api/now/table/sys_user/${sysId}`;
    const res = await request.get(userUrl)
      .set('Authorization', `Bearer ${accessToken}`);
    return res.body.result;
  }

};
