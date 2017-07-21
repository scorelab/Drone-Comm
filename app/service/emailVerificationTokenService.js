/**
 * @author Amila Karunathilaka
 */

const droneCommServiceError = require('../util/error/DroneCommServiceError');

const uuidv4 = require('uuid/v4');

const emailVerificationTokenDAO = require('../dao/emialVerificationTokenDAO');

const userService = require('./userService');
const profileService = require('./profileService');

emailVerificationTokenService = {};

emailVerificationTokenService.createToken = function (userId, callback) {
    var token = uuidv4();
    var date = Date.now();
    date += (1000 * 60 * 60 * 24);
    var verificationToken = {
        userId: userId,
        token: token,
        expiredDate: new Date(date)
    };
    emailVerificationTokenDAO.insert(verificationToken, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, token);
    });
};

emailVerificationTokenService.verifyToken = function (token, callback) {
    emailVerificationTokenDAO.getToken(token, function (err, verificationToken) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }

        if (verificationToken.expiredDate >= Date.now()) {
            userService.activeUser(verificationToken.userId, function (err, success) {
                if (err) {
                    return callback(err);
                }
                callback(null, {success: true});
            });
        } else {
            callback(new droneCommServiceError("Verification token is expired.."));
        }
    });
};

emailVerificationTokenService.resendToken = function (username, callback) {
    userService.getUser(username, function (err, user) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        emailVerificationTokenDAO.getToken(user._id, function (err, token) {
            if (err) {
                return callback(new droneCommServiceError("Database Connection Error", err));
            }
            profileService.getProfileByUsername(username, function (err, profile) {
               if (err) {
                   return callback(new droneCommServiceError("Database Connection Error", err));
               }
                callback(null, {
                    token: token,
                    email: resources.profile.email
                });
            });
        });
    });
};

module.exports = emailVerificationTokenService;