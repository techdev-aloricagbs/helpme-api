const nock = require('nock');
const { url } = require('config/servicenow');
const IncidentCreator = require('src/services/service-now/incident-creator');

describe('IncidentCreator', () => {
  const token = 'biM0vraNrU3gvcGmP0nYz4Uz-dmrpHSyVjZuVSdXFqjY1r3K0bPPaaj6Kti22EvEvDva_FzeXbcuL610L3rFjQ';

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
    sys_updated_by: 'abraham.lincoln',
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
    sys_created_by: 'abraham.lincoln',
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
    short_description: 'We need help!!!',
    description: 'Computer is burning!!!',
    urgency: 1,
    impact: 1,
    sysInfo: {
      manufacturer: 'Intel',
      brand: 'Core i5-2400',
    },
  };

  let incidentApi;

  beforeEach(() => {
    incidentApi = nock(url)
    .matchHeader('authorization', `Bearer ${token}`)
    .post('/api/now/table/incident', params)
    .reply(201, { result: serviceNowRes });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('calls the service now endpoint', async () => {
    await IncidentCreator.execute(params, token);
    incidentApi.done();
  });

  it('promises the service now response', () => {
    const res = IncidentCreator.execute(params, token);
    return expect(res).resolves.toEqual(serviceNowRes);
  });
});
