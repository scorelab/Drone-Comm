/**
 * @author Amila Karunathilaka
 */

var User =require('../model/user');

userDAO = {};

userDAO.insertUser = function (userData, callback) {
    var userObj = new User(userData);
    userObj.save(function (err) {
        callback(err);
    });
};


userDAO.getUser = function(name, callback) {
    User.findOne({name: name}, function (err, user) {
        callback(err, user);
    });
};

module.exports = userDAO;