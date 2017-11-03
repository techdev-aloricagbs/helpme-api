const glideRecord = require('src/services/service-now');
const eventBus = require('src/eventBus');
const Promise = require('bluebird');

class TicketCreator {

  static execute(params) {
    const promise = glideRecord.insert(params.ticket);
    return Promise.resolve(promise).tap((ticket) => {
      eventBus.emit('ticket-created', ticket, params.sysInfo);
    });
  }

}

module.exports = TicketCreator;
