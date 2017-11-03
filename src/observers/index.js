const eventBus = require('../eventBus');

const TicketObserver = require('./TicketObserver');

new TicketObserver(eventBus);
