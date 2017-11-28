
const Router = require('express').Router;

const TicketCreator = require('src/domains/ticket-creator');
const MyIncidentsFetcher = require('src/services/service-now/my-incidents-fetcher');
const passport = require('./passport');

const router = Router();

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

module.exports = router;
