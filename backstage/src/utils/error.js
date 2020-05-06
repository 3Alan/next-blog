class LoginRequiredError extends Error {
  constructor(message) {
    super();
    this.name = 'LoginRequiredError';
    this.message = (message || '');
  }
}
class ValidateError extends Error {
  constructor(message) {
    super();
    this.name = 'ValidateError';
    this.message = (message || '');
  }
}

module.exports.LoginRequiredError = LoginRequiredError;
module.exports.ValidateError = ValidateError;
