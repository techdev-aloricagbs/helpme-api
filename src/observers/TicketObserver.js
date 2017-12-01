const SystemInfo = require('src/models/SystemInfo');

class TicketObserver {

  constructor(eventBus) {
    eventBus.on('ticket-created', this.recordSystemInfo);
  }

  recordSystemInfo(ticket, sysInfo) {
    const newSysInfo = new SystemInfo(Object.assign({
      ticket_number: ticket.number,
      location: ticket.location,
      short_description: ticket.short_description,
      description: ticket.description,
      sys_created_on: ticket.sys_created_on,
      sys_updated_on: ticket.sys_updated_on,
    }, sysInfo));
    return newSysInfo.save();
  }

}

module.exports = TicketObserver;
