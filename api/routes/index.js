const Router = require('express').Router;

const changeCase = require('./middlewares/change-case');
const authenticateClient = require('./middlewares/authenticate-client');
const Authenticator = require('src/services/service-now/authenticator');
const swaggerConfig = require('config/swagger');
const { env } = require('config/app');
const passport = require('./passport');
const tickets = require('./tickets');
const ticket = require('./ticket');

const router = Router();

router.use(changeCase);
router.get('/', (req, res) => {
  res.json({
    message: 'Hello',
    version: '1.0',
    environment: env,
  });
});


router.use(passport.authenticate('bearer', { session: false }));

router.use('/tickets', tickets);
router.use('/ticket', ticket);

router.get('/user', async (req, res) => {
  res.json(req.user);
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
   console.log(err)
  res.status(err.status)
    .json(err.toJSON());
});

module.exports = router;
