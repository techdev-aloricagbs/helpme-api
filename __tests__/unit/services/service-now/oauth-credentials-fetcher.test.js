const nock = require('nock');
const { url } = require('config/servicenow');
const OauthCredentialsFetcher = require('src/services/service-now/oauth-credentials-fetcher');

describe('OauthCredentialsFetcher', () => {
  const token = '_cajjuA5_FU_Xao_obn36mNNXvhVQ-uTygSp0czCDrIgh77JFjyEpIAyW2JuSdhqjaBNSB9jBsNRbBLlys7ayw';

  const oauthItem = {
    expires: '2017-11-23 15:07:16',
    sys_mod_count: '0',
    sys_updated_on: '2017-11-23 14:37:16',
    sys_tags: '',
    type: 'access_token',
    session_user: '',
    token,
    sys_id: '410cd2eadb6203006c91d5f0cf96198d',
    sys_updated_by: 'guest',
    peer: {
      link: 'https://dev27336.service-now.com/api/now/table/oauth_entity/9f8b79a1db6203006c91d5f0cf9',
      value: '9f8b79a1db6203006c91d5f0cf9',
    },
    sys_created_on: '2017-11-23 14:37:16',
    scopes: 'useraccount',
    user: {
      link: 'https://dev27336.service-now.com/api/now/table/sys_user/a8fb79a1db6203006c91d5f0cf9',
      value: 'a8fb79a1db6203006c91d5f0cf9',
    },
    sys_created_by: 'guest',
  };

  beforeEach(() => {
    nock(url)
      .matchHeader('Authorization', `Bearer ${token}`)
      .get('/api/now/table/oauth_credential')
      .query({
        sysparm_query: `token=${token}`,
      })
      .reply(200, {
        result: [
          oauthItem,
        ],
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('promises the service now response body', async () => {
    const res = await OauthCredentialsFetcher.execute(token);
    expect(res).toEqual(oauthItem);
  });
});
