/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var userDAO = require('../dao/userDAO');
var profileDAO = require('../dao/profileDAO');
var authenticationFilter = require('../util/auth/authenticationFilter');

authenticationService = {};

authenticationService.login = function (name, password, callback) {
    userDAO.getUser(name, function (err, user) {
        console.log(err, user);
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        } else if ( user && user.password == password){
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

authenticationService.register = function (resources, callback) {
    if ( !resources || !resources.user ||!resources.profile ||
        resources.isEmpty() || resources.user.isEmpty() || resources.profile.isEmpty) {
        var error = new droneCommServiceError('Bad Request...');
        error.status = 400;
        return callback(error);
    }
    userDAO.insert(resources.user, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }

        profileDAO.insert(resources.profile, function (err) {
            if (err) {
                err = userDAO.remove(resources.user.name, function () {
                    if (err) {
                        return callback(new droneCommServiceError("Database Connection Error", err));
                    }
                });
                return callback(new droneCommServiceError("Database Connection Error", err));
            }
            callback(null, {success: true});
        });

    });
} ;

module.exports = authenticationService;