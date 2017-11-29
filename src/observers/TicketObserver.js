const SystemInfo = require('src/models/SystemInfo');

class TicketObserver {

  constructor(eventBus) {
    eventBus.on('ticket-created', this.recordSystemInfo);
  }

  recordSystemInfo(ticket, sysInfo) {
    const newSysInfo = new SystemInfo(Object.assign({
      ticket_number: ticket.number,
      location: ticket.location,
    }, sysInfo));
    return newSysInfo.save();
  }

}

module.exports = TicketObserver;
