const request = require('supertest');
const GlideRecord = require('servicenow-rest').gliderecord;
const app = require('bin/test');
const { url } = require('config/database');
const mongoose = require('mongoose');

describe('POST /tickets', () => {
  const params = {
    ticket: {
      short_description: 'We need help!!!',
      description: 'Computer is burning!!!',
      urgency: 1,
      impact: 1,
    },
    sysInfo: {
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

  let glideSpy;

  beforeEach(() => {
    glideSpy = jest.spyOn(GlideRecord.prototype, 'insert')
      .mockReturnValue(Promise.resolve(serviceNowRes));
    mongoose.connect(url);
  });

  afterEach(() => {
    glideSpy.mockRestore();
  });

  it('responds with a 201', () => request(app)
      .post('/tickets')
      .send(params)
      .expect(201));

  it('responds with servicenow\'s response', () => request(app)
      .post('/tickets')
      .send(params)
      .then((res) => {
        expect(res.body).toEqual(serviceNowRes);
      }));
});
