const changeCaseObj = require('change-case-object');

module.exports = (req, res, next) => {
  req.body = changeCaseObj.camelCase(req.body);
  next();
}
