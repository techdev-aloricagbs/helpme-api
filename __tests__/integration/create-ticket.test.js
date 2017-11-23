const request = require('supertest');
const nock = require('nock');
const app = require('bin/test');
const serviceNowUrl = require('config/servicenow').url;
const { url } = require('config/database');
const mongoose = require('mongoose');

describe('POST /tickets', () => {
  const token = 'biM0vraNrU3gvcGmP0nYz4Uz-dmrpHSyVjZuVSdXFqjY1r3K0bPPaaj6Kti22EvEvDva_FzeXbcuL610L3rFjQ';
  const params = {
    short_description: 'We need help!!!',
    description: 'Computer is burning!!!',
    urgency: 1,
    impact: 1,
    sys_info: {
      manufacturer: 'Intel',
      brand: 'Core i5-2400',
    },
  };

  const serviceNowRes = {
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

  beforeEach(() => {
    nock(serviceNowUrl)
      .matchHeader('authorization', `Bearer ${token}`)
      .post('/api/now/table/incident', params)
      .reply(201, { result: serviceNowRes });

    mongoose.connect(url);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('responds with a 201', () => request(app)
      .post('/tickets')
      .send(params)
      .set('Authorization', `Bearer ${token}`)
      .expect(201));

  it('responds with servicenow\'s response', () => request(app)
      .post('/tickets')
      .send(params)
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body).toEqual(serviceNowRes);
      }));

  it('responds with a 401 when no bearer token is passed', () => request(app)
      .post('/tickets')
      .send(params)
      .expect(401));
});
