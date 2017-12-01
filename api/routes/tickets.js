
const Router = require('express').Router;

const TicketCreator = require('src/domains/ticket-creator');
const MyIncidentsFetcher = require('src/services/service-now/my-incidents-fetcher');
const passport = require('./passport');

const router = Router();

router.get('/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  try {
    const incidentNumberFilter = req.query.id_filter;
    const tickets = await MyIncidentsFetcher.execute(req.token, incidentNumberFilter);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
});

router.post('/', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  const params = req.body;
  try {
    const creator = new TicketCreator(req.user)
    const ticket = await creator.execute(params, req.token);
    res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
