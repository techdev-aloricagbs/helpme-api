const nock = require('nock');
const { url, admin } = require('config/servicenow');
const UserFetcher = require('src/services/service-now/user-fetcher');

describe('OauthCredentialsFetcher', () => {
  const sysId = 'a8f98bb0eb32010045e1a5115206fe3a';

  const userItem = {
    calendar_integration: '1',
    country: '',
    user_password: '$s$ApJAi4cyZI2VUyUR77pUXUoevYtUAWl862FDAa3YQtM=$8uU3o45Y/yxc46xyFXVYobB2zCCt0p',
    last_login_time: '2017-11-23 15:07:16',
    source: '',
    sys_updated_on: '2017-11-23 15:07:16',
    building: '',
    web_service_access_only: 'false',
    notification: '2',
    sys_updated_by: 'admin',
    sys_created_on: '2017-11-23 14:37:16',
    sys_domain: {
      link: 'https://dev27336.service-now.com/api/now/table/sys_user_group/global',
      value: 'global',
    },
    state: '',
    vip: 'false',
    sys_created_by: 'admin',
    zip: '',
    home_phone: '',
    time_format: '',
    last_login: '',
    default_perspective: '',
    active: 'true',
    sys_domain_path: '/',
    cost_center: '',
    phone: '',
    name: 'Abraham Lincoln',
    employee_number: '',
    password_needs_reset: 'false',
    gender: '',
    city: '',
    failed_attempts: '',
    user_name: 'abraham.lincoln',
    roles: 'admin,itil',
    title: '',
    sys_class_name: 'sys_user',
    sys_id: sysId,
    internal_integration_user: 'false',
    ldap_server: '',
    mobile_phone: '(555) 555-0004',
    street: '',
    company: '',
    department: '',
    first_name: 'Abraham',
    email: 'abraham.lincoln@example.com',
    introduction: '',
    preferred_language: '',
    manager: '',
    locked_out: 'false',
    sys_mod_count: '4',
    last_name: 'Lincoln',
    photo: '',
    middle_name: '',
    sys_tags: '',
    time_zone: '',
    schedule: '',
    date_format: '',
    location: '',
  };

  beforeEach(() => {
    const adminToken = new Buffer(`${admin.username}:${admin.password}`).toString('base64');
    nock(url)
      .matchHeader('Authorization', `Basic ${adminToken}`)
      .get(`/api/now/table/sys_user/${sysId}`)
      .reply(200, {
        result: userItem,
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('promises the service now response body', async () => {
    const res = await UserFetcher.execute(sysId);
    expect(res).toEqual(userItem);
  });
});
