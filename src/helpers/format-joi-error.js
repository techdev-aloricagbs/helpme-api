const changeCase = require('change-case');

module.exports = (err) => {
  const errs = err.details.map(detail => ({
    name: `${changeCase.upperCaseFirst(detail.path)}${err.name}`,
    message: detail.message,
  }));

  return {
    status: 400,
    toJSON() {
      return {
        status: 400,
        errors: errs,
      };
    },
  };
};
