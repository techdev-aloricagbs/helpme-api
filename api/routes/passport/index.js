const passport = require('passport');
const bearer = require('./bearer');

passport.use(bearer);

module.exports = passport;
