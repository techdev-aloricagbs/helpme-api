const Router = require('express').Router;

const changeCase = require('./middlewares/change-case');
const authenticateClient = require('./middlewares/authenticate-client');
const TicketCreator = require('src/domains/ticket-creator');
const Authenticator = require('src/services/service-now/authenticator');
const MyIncidentsFetcher = require('src/services/service-now/my-incidents-fetcher');
const OauthFetcher = require('src/services/service-now/oauth-credentials-fetcher');
const UserFetcher = require('src/services/service-now/user-fetcher');
const swaggerConfig = require('config/swagger');
const { env } = require('config/app');
const passport = require('./passport');

const router = Router();

router.use(changeCase);
router.get('/', (req, res) => {
  res.json({
    message: 'Hello',
    version: '1.0',
    environment: env,
  });
});

router.get('/tickets', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  try {
    const tickets = await MyIncidentsFetcher.execute(req.token);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

router.post('/tickets', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  const params = req.body;
  try {
    const ticket = await TicketCreator.execute(params, req.token);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

router.get('/user', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  try {
    const oauthItem = await OauthFetcher.execute(req.token);
    const user = await UserFetcher.execute(oauthItem.user.value, req.token);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/tokens', authenticateClient, async (req, res, next) => {
  const params = req.body;
  try {
    const auth = Authenticator.execute(params);
    res.status(201).json(auth);
  } catch (err) {
    next(err);
  }
});

router.get('/swagger', (req, res) => {
  res.json(swaggerConfig);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  res.status(err.status)
    .json(err.toJSON());
});

module.exports = router;
