/**
 * @author Amila Karunathilaka
 */

const EmailVerificationToken = require('../model/emailVerificationToken');

emailVerificationTokenDAO = {};

emailVerificationTokenDAO.insert = function (token, callback) {
    var tokenObj = new EmailVerificationToken(token);
    tokenObj.save(function (err) {
        callback(err);
    })
};


emailVerificationTokenDAO.getToken = function (token, callback) {
    EmailVerificationToken.findOne({token: token}, function (err, verificationToken) {
        callback(err, verificationToken);
    })
};

emailVerificationTokenDAO.getTokenByUserId = function (userId, callback) {
    EmailVerificationToken.findOne({userId: userId}, function (err, verificationToken) {
        callback(err, verificationToken);
    })
};

module.exports = emailVerificationTokenDAO;