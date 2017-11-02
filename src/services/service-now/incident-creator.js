const glideRecord = require('./');

class IncidentCreator {

  static execute(params) {
    return glideRecord.insert(params);
  }

}

module.exports = IncidentCreator;
