const nock = require('nock');
const querystring = require('querystring');
const { url, client } = require('config/servicenow');
const Authenticator = require('src/services/service-now/authenticator');
const ApiError = require('src/ApiError');

describe('ServiceNowAuthenticator.execute', () => {
  const username = 'abraham.lincoln';
  const password = 'qwerty123';

  const expectedServiceNowParams = {
    grant_type: 'password',
    client_id: client.id,
    client_secret: client.secret,
    username,
    password,
  };

  const params = {
    username,
    password,
  };


  const serviceNowRes = {
    access_token: 'MXgA19ZQ_j60k6oi7YRPKhx31neAEpuFnKq8MS-Wh_kzTNOUGqQO_ypghEdAX0evuKR9fV',
    refresh_token: 'lsgxCDcppN-M2El29QGHz2gnz98b-bj5BvWQW4SfmeZhKmEQgiJF_ErGgaDCb6Edwf2U6',
    scope: 'useraccount',
    token_type: 'Bearer',
    expires_in: 333299,
  };

  beforeEach(() => {
    nock(url)
      .post('/oauth_token.do', querystring.stringify(expectedServiceNowParams))
      .reply(200, serviceNowRes);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('returns a promise', () => {
    const promise = Authenticator.execute(params);
    expect(promise.then).toBeTruthy();
  });

  it('promises the service now response', async () => {
    const res = await Authenticator.execute(params);
    expect(res).toEqual(serviceNowRes);
  });

  describe('when service now responds with a 401', () => {
    const serviceNowErrRes = {
      error_description: 'access_denied',
      error: 'server_error',
    };

    beforeEach(() => {
      nock.cleanAll();
      nock(url)
        .post('/oauth_token.do', querystring.stringify(expectedServiceNowParams))
        .reply(401, serviceNowErrRes);
    });

    it('rejects', async (done) => {
      try {
        await Authenticator.execute(params);
        done.fail();
      } catch (err) {
        done();
      }
    });
  });
});
