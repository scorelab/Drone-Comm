/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../error/DroneCommServiceError');

var jwt = require('jsonwebtoken');

authenticationFilter = {};

authenticationFilter.createToken = function (user) {
    var token = jwt.sign(user, 'Amila', {
     /*  algorithm: 'RS256',*/
        expiresIn: 1440 // expire in 24 hours
    });
    return token;
};

authenticationFilter.verifyToken = function (token, callback) {
    if(token) {
        jwt.verify(token, 'Amila', /*{algorithm: ['RS256']},*/ function (err, decoded) {
            if (err) {
                var error = new droneCommServiceError(err.message, err);
                error.status = 401;
                return callback(error);
            } else {
                callback(null, {success: true, decoded : decoded});
            }
        });
    } else {
        var error = new droneCommServiceError("Token not provided");
        error.status = 403;
        return callback(error);
    }
};

module.exports = authenticationFilter;