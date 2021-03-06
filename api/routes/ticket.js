const Router = require('express').Router;
const SystemInfo = require('src/models/SystemInfo');
const ApiError = require('src/ApiError');

const router = Router();

router.get('/:ticketNumber', (req, res, next) => {
  SystemInfo.find({
    ticket_number: req.params.ticketNumber,
  }, (err, systemInfo) => {
    if (err) {
      const apiError = new ApiError('ServerError', err.message, 500);
      return next(apiError);
    }

    console.log(systemInfo);
    res.json(systemInfo);
  });
});

module.exports = router;
