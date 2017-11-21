const { clientToken } = require('config/app');
const ApiError = require('src/ApiError');

module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;
  if (authToken !== clientToken) {
    const err = new ApiError('InvalidTokenError', 'Invalid token', 401);
    return next(err);
  }

  next();
};
