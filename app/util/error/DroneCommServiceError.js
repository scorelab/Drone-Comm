/**
 * @author Amila Karunathilaka
 */

var DroneCommServiceError = function (message, error) {
  Error.call(this, message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'DroneCommServiceError';
  this.message = message;
  if (error) {
      this.error =error;
  }
};

DroneCommServiceError.prototype = Object.create(Error.prototype);
DroneCommServiceError.prototype.constructor = DroneCommServiceError;

module.exports =DroneCommServiceError;
