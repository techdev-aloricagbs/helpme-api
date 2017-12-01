const eventBus = require('src/eventBus');
const changeCaseObj = require('change-case-object');
const IncidentCreator = require('src/services/service-now/incident-creator');

class TicketCreator {

  constructor(serviceNowUser) {
    this.serviceNowUser = serviceNowUser;
  }

  async execute(params, token) {
    const serviceNowParams = Object.assign(changeCaseObj.snakeCase(params), {
      caller_id: this.serviceNowUser.sys_id,
      u_call_back_number: this.serviceNowUser.mobile_phone || '000-000-0000',
      u_company_impacted: 'Alorica',
      u_impacted_client: 'Alorica Internal',
      u_issue_first_occurred: new Date(),
      u_symptom: 'Not working properly',
    });
    serviceNowParams.called_id = this.serviceNowUser.sys_id;
    const res = await IncidentCreator.execute(serviceNowParams, token);
    eventBus.emit('ticket-created', res, params.sysInfo);
    return res;
  }

}

module.exports = TicketCreator;
