const GlideRecord = require('servicenow-rest').gliderecord;
const TicketCreator = require('src/domains/ticket-creator');
const eventBus = require('src/eventBus');

describe('TicketCreator', () => {
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
    opened_by: {
      link: 'https://dev27336.service-now.com/api/now/v1/table/sys_user/6816f79cc0a8016401c5ab923491342190a',
      value: '6816f79cc0a8016401c5a33be04be441',
    },
    user_input: '',
    sys_created_on: '2017-11-02 12:54:51',
    sys_domain: {
      link: 'https://dev27336.service-now.com/api/now/v1/table/sys_user_group/global',
      value: 'global',
    },
    state: '1',
    sys_created_by: 'admin',
    knowledge: 'false',
    order: '',
    calendar_stc: '',
    closed_at: '',
    cmdb_ci: '',
    delivery_plan: '',
    impact: '3',
    active: 'true',
    work_notes_list: '',
    business_service: '',
    priority: '4',
    sys_domain_path: '/',
    rfc: '',
    time_worked: '',
    expected_start: '',
    opened_at: '2017-11-02 12:54:51',
    business_duration: '',
    group_list: '',
    work_end: '',
    caller_id: '',
    resolved_at: '',
    approval_set: '',
    subcategory: '',
    work_notes: '',
    short_description: 'We need help!!!',
    close_code: '',
    correlation_display: '',
    delivery_task: '',
    work_start: '',
    assignment_group: '',
    additional_assignee_list: '',
    business_stc: '',
    description: 'Computer is burning!!!',
    calendar_duration: '',
    close_notes: '',
    notify: '1',
    sys_class_name: 'incident',
    closed_by: '',
    follow_up: '',
    parent_incident: '',
    sys_id: 'b32b797fdb4203006c91d5f0cf9619f8',
    contact_type: '',
    incident_state: '1',
    urgency: '2',
    problem_id: '',
    company: '',
    reassignment_count: '0',
    activity_due: '',
    assigned_to: '',
    severity: '3',
    comments: '',
    approval: 'not requested',
    sla_due: '',
    comments_and_work_notes: '',
    due_date: '',
    sys_mod_count: '0',
    reopen_count: '0',
    sys_tags: '',
    escalation: '0',
    upon_approval: 'proceed',
    correlation_id: '',
    location: '',
    category: 'inquiry',
  };

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

  let glideSpy;
  let eventSpy;

  beforeEach(() => {
    glideSpy = jest.spyOn(GlideRecord.prototype, 'insert')
      .mockReturnValue(Promise.resolve(serviceNowRes));
    eventSpy = jest.spyOn(eventBus, 'emit');
  });

  afterEach(() => {
    eventSpy.mockRestore();
    glideSpy.mockRestore();
  });

  it('returns a promise', () => {
    const promise = TicketCreator.execute(params);
    expect(promise.then).toBeTruthy();
  });

  it('promises the service now response', () => {
    const promise = TicketCreator.execute(params);
    return expect(promise).resolves.toBe(serviceNowRes);
  });

  it('emits a ticket-created event', () => {
    return TicketCreator.execute(params).then(() => {
      const firstCall = eventSpy.mock.calls[0];
      const eventName = firstCall[0];
      expect(eventName).toBe('ticket-created');
    })
  });
});
