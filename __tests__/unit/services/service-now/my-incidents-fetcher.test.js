const { url } = require('config/servicenow');
const nock = require('nock');
const MyIncidentsFetcher = require('src/services/service-now/my-incidents-fetcher');

describe('MyIncidentsFetcher', () => {
  const token = 't8vN29T2r91RSpgXu65fEQ4-S-pJhq4JK2BuruJBp4re54lKIZ1ykdLcZwo1AibEoiaFOllz27fSlSF2I43TjA';

  const myIncident = {
    parent: '',
    made_sla: 'true',
    caused_by: '',
    watch_list: '',
    upon_reject: 'cancel',
    sys_updated_on: '2017-11-02 12:54:51',
    child_incidents: '0',
    hold_reason: '',
    approval_history: '',
    number: 'INC0010005',
    resolved_by: '',
    sys_updated_by: '',
  };

  const myIncidents = [
    myIncident,
    myIncident,
    myIncident,
  ];

  beforeEach(() => {
    nock(url)
      .matchHeader('Authorization', `Bearer ${token}`)
      .get('/api/now/table/incident')
      .reply(200, {
        result: myIncidents,
      });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('promises the service now response body', async () => {
    const res = await MyIncidentsFetcher.execute(token);
    expect(res).toEqual(myIncidents);
  });
});
