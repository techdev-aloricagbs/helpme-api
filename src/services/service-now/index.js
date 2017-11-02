const GlideRecord = require('servicenow-rest').gliderecord;
const { instance, username, password } = require('config/servicenow');

module.exports = new GlideRecord(instance, 'incident', username, password, 'v1');
