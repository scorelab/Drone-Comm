/**
 * @author Amila Karunathilaka
 */

const droneCommServiceError = require('../util/error/DroneCommServiceError');

const userDAO = require('../dao/userDAO');

userService = {};

userService.insertUser = function (user, callback) {
    userDAO.insert(user, function (err) {
        if (err) {
           return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, {success: true});
    });
};

userService.getUser = function (name, callback) {
    userDAO.getUser(name, function (err, user) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, user)
    });
};

userService.removeUser = function (name, callback) {
    userDAO.remove(name, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, {success: true});
    });
};

userService.activeUser = function (id, callback) {
    userDAO.getUserById(id, function (err, user) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        user.active = true;
        userDAO.update(user, function (err) {
            if (err) {
                return callback(new droneCommServiceError("Database Connection Error", err));
            }
        });
        callback(null, {success: true});
    })
};

module.exports = userService;