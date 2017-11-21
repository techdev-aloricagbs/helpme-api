const IncidentCreator = require('src/services/service-now/incident-creator');
const TicketCreator = require('src/domains/ticket-creator');
const eventBus = require('src/eventBus');

describe('TicketCreator', () => {
  const token = 'biM0vraNrU3gvcGmP0nYz4Uz-dmrpHSyVjZuVSdXFqjY1r3K0bPPaaj6Kti22EvEvDva_FzeXbcuL610L3rFjQ';
  const serviceNowRes = {
    parent: '',
    made_sla: 'true',
    caused_by: '',
    watch_list: '',
    upon_reject: 'cancel',
    sys_updated_on: '2017-11-02 12:54:51',
    child_incidents: '0',
    category: 'inquiry',
  };

  const params = {
    short_description: 'We need help!!!',
    description: 'Computer is burning!!!',
    urgency: 1,
    impact: 1,
    token,
    sysInfo: {
      manufacturer: 'Intel',
      brand: 'Core i5-2400',
    },
  };

  let glideSpy;
  let eventSpy;

  beforeEach(() => {
    glideSpy = jest.spyOn(IncidentCreator, 'execute')
      .mockReturnValue(Promise.resolve(serviceNowRes));
    eventSpy = jest.spyOn(eventBus, 'emit');
  });

  afterEach(() => {
    eventSpy.mockRestore();
    glideSpy.mockRestore();
  });

  it('promises the service now response', () => {
    const promise = TicketCreator.execute(params);
    return expect(promise).resolves.toBe(serviceNowRes);
  });

  it('emits a ticket-created event', () => TicketCreator.execute(params).then(() => {
    const firstCall = eventSpy.mock.calls[0];
    const eventName = firstCall[0];
    expect(eventName).toBe('ticket-created');
  }));
});
