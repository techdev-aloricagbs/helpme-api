const request = require('superagent');
const { url, admin } = require('config/servicenow');

module.exports = class {

  static async execute(sysId) {
    const userUrl = `${url}/api/now/table/sys_user/${sysId}`;
    const adminToken = new Buffer(`${admin.username}:${admin.password}`).toString('base64');
    const res = await request.get(userUrl)
      .set('Authorization', `Basic ${adminToken}`);
    return res.body.result;
  }

};
