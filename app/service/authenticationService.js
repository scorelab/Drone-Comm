/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var userDAO = require('../dao/userDAO');
var profileDAO = require('../dao/profileDAO');
var authenticationFilter = require('../util/auth/authenticationFilter');

const profileService = require('./profileService');
const userService = require('./userService');
const emailVerificationToken = require('./emailVerificationTokenService');

authenticationService = {};

authenticationService.login = function (name, password, callback) {
    userDAO.getUser(name, function (err, user) {
        console.log(err, user);
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        } else if ( user && user.password == password){
            var token = authenticationFilter.createToken({name : user.name, userId: user._id});
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
    if ( !resources || !resources.user) {
        var error = new droneCommServiceError('Bad Request...');
        error.status = 400;
        return callback(error);
    }
    userService.insertUser(resources.user, function (err, successUser) {
        if (err) {
            return callback(err);
        }
        userService.getUser(resources.user.name, function (err, user) {
            if (err) {
                userService.removeUser(resources.user.name, function (err, success) {
                    if (err) {
                        return callback(err);
                    }
                });
                return callback(err);
            }
            resources.user = user._id;
            profileService.insertProfile(resources, function (err, successProfile) {
                if (err) {
                    userService.removeUser(resources.user.name, function (err, success) {
                        if (err) {
                            return callback(err);
                        }
                    });
                    return callback(err);
                }

                emailVerificationToken.createToken(user._id, function (err, token) {
                    if (err) {
                        profileService.removeProfile(user._id, function (err, success) {
                                userService.removeUser(resources.user.name, function (err, success) {
                                    if (err) {
                                        return callback(err);
                                    }
                                });
                                if (err) {
                                    return callback(err);
                                }
                        });
                        return callback(err);
                    }

                    callback(null,
                        {
                            success: (successUser.success && successProfile.success),
                            token: token,
                            email: resources.email
                        });

                });
            });
        });
    });
};


module.exports = authenticationService;