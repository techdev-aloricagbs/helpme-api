const SystemInfo = require('src/models/SystemInfo');

class TicketObserver {

  constructor(eventBus) {
    eventBus.on('ticket-created', this.recordSystemInfo);
  }

  recordSystemInfo(ticket, sysInfo) {
    const newSysInfo = new SystemInfo(sysInfo);
    return newSysInfo.save();
  }

}
