class ApiError extends Error {

  constructor(name, message, statusCode) {
    super(message || 'Something went wrong');
    this.name = name || 'ApiError';
    this.status = statusCode || 403;
  }

  toJSON() {
    return {
      status: this.status,
      errors: [
        {
          name: this.name,
          message: this.message,
        },
      ],
    };
  }
}

module.exports = ApiError;
