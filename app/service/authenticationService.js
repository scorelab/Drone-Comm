/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var userDAO = require('../dao/userDAO');
var authenticationFilter = require('../util/auth/authenticationFilter');

authenticationService = {};

authenticationService.login = function (name, password, callback) {
    userDAO.getUser(name, function (err, user) {
        console.log(err, user);
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        } else if ( user && user.password != password){
            var token = authenticationFilter.createToken({name : user.name, password: user.password});
            var response = {
                token: token
            };
            return callback(null, response);
        } else {
            var error = new droneCommServiceError("Authentication Credential Invalid....");
            error.status = 401;
            callback(error);
        }
    });
};

module.exports = authenticationService;