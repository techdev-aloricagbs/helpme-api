const { url } = require('config/servicenow');
const request = require('supertest');
const app = require('bin/test');
const nock = require('nock');

describe('GET /tickets', () => {
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

  it('responds with a 200', () => request(app)
      .get('/tickets')
      .set('Authorization', `Bearer ${token}`)
      .expect(200));

  it('responds with a the service now response body', () => request(app)
      .get('/tickets')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body).toEqual(myIncidents);
      }));

  describe('when a filter is passed', () => {
    const incidentNumber = 'INC2';
    let incidentsApi;

    beforeEach(() => {
      nock.cleanAll();
      incidentsApi = nock(url)
        .matchHeader('Authorization', `Bearer ${token}`)
        .get('/api/now/table/incident')
        .query({
          sysparm_query: `numberLIKE${incidentNumber}`,
        })
        .reply(200, {
          result: myIncidents,
        });
    });

    it('appends the number to the sysparm_query', () => request(app)
        .get(`/tickets?id_filter=${incidentNumber}`)
        .set('Authorization', `Bearer ${token}`)
        .then(() => {
          incidentsApi.done();
        }));
  });
});
