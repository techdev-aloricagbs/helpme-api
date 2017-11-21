const eventBus = require('src/eventBus');
const Promise = require('bluebird');
const changeCaseObj = require('change-case-object');
const IncidentCreator = require('src/services/service-now/incident-creator');

class TicketCreator {

  static async execute(params, token) {
    const serviceNowParams = changeCaseObj.snakeCase(params);
    const res = await IncidentCreator.execute(serviceNowParams, token);
    eventBus.emit('ticket-created', res, params.sysInfo);
    return res;
  }

}

module.exports = TicketCreator;
