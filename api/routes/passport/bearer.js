const BearerStrategy = require('passport-http-bearer').Strategy;
const OauthFetcher = require('src/services/service-now/oauth-credentials-fetcher');
const UserFetcher = require('src/services/service-now/user-fetcher');

module.exports = new BearerStrategy(async (token, cb) => {
  try {
    const oauthItem = await OauthFetcher.execute(token);
    const user = await UserFetcher.execute(oauthItem.user.value, token);
    cb(null, user);
  } catch (err) {
    cb(err);
  }
});
