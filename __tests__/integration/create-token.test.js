const request = require('supertest');
const { url, client } = require('config/servicenow');
const querystring = require('querystring');
const { clientToken } = require('config/app');
const app = require('bin/test');
const nock = require('nock');

describe('POST /tokens', () => {
  const username = 'abraham.lincoln';
  const password = 'qwerty123';
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

  const expectedServiceNowParams = {
    grant_type: 'password',
    client_id: client.id,
    client_secret: client.secret,
    username,
    password,
  };

  beforeEach(() => {
    nock(url)
      .post('/oauth_token.do', querystring.stringify(expectedServiceNowParams))
      .reply(200, serviceNowRes);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('responds with a 201', () => request(app)
      .post('/tokens')
      .set('authorization', clientToken)
      .send(params)
      .expect(201));

  it('responds with a 401 when no client token is passed', () => request(app)
      .post('/tokens')
      .send(params)
      .expect(401));

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

    it('responds with a 401', () => request(app)
      .post('/tokens')
      .send(params)
      .expect(401));
  });
});
