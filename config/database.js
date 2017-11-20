const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  url: `mongodb://localhost/${
    process.env.NODE_ENV !== 'test' ?
      process.env.DB_NAME : `${process.env.DB_NAME}-test`
  }`,
};
