const glideRecord = require('src/services/service-now');
const eventBus = require('src/eventBus');
const Promise = require('bluebird');
const changeCaseObj = require('change-case-object');

class TicketCreator {

  static execute(params) {
    const serviceNowParams = changeCaseObj.snakeCase(params);
    const promise = glideRecord.insert(serviceNowParams);
    return Promise.resolve(promise).tap((ticket) => {
      eventBus.emit('ticket-created', ticket, params.sysInfo);
    });
  }

}

module.exports = TicketCreator;
