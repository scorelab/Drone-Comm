/**
 * @author Amila Karunathilaka
 */

var User =require('../model/user');

userDAO = {};

userDAO.insert = function (userData, callback) {
    var userObj = new User(userData);
    userObj.save(function (err) {
        if (err) {
            callback(err);
        }
        userDAO.getUser(userData.name, function (err, user) {
            callback(err, user);
        })
    });
};

userDAO.remove = function (username, callback) {
    User.remove({name: username}, function (err) {
        callback(err);
    })
};

userDAO.getUser = function(name, callback) {
    User.findOne({name: name}, function (err, user) {
        callback(err, user);
    });
};

module.exports = userDAO;