const querystring = require('querystring');
const axios = require('axios');
const Authenticator = require('src/services/service-now/authenticator');

describe('ServiceNowAuthenticator.execute', () => {
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

  let axiosSpy;

  beforeEach(() => {
    axiosSpy = jest.spyOn(axios, 'post')
      .mockReturnValue({
        data: serviceNowRes,
      });
  });

  afterEach(() => {
    axiosSpy.mockRestore();
  });

  it('returns a promise', () => {
    const promise = Authenticator.execute(params);
    expect(promise.then).toBeTruthy();
  });

  it('promises the service now response', async () => {
    const res = await Authenticator.execute(params);
    expect(res).toBe(serviceNowRes);
  });
});
