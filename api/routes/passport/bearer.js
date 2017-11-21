const BearerStrategy = require('passport-http-bearer').Strategy;

module.exports = new BearerStrategy({ passReqToCallback: true }, (req, token, cb) => {
  req.token = token;
  cb(null, {});
})
