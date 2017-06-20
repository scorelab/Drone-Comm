/**
 * @author Amila Karunathilaka
 */

var Profile = require('../model/profile');

profileDAO = {};

profileDAO.insert = function (profile, callback) {
    var profileObj = new Profile(profile);
    profileObj.save(function (err) {
        callback(err);
    })
};


profileDAO.findByUserName = function (username, callback) {
    console.warn(username);
    Profile.find().populate({path:'user', match: {name: username}}).exec(function (err, profile) {
        callback(err, profile);
    });
};

module.exports = profileDAO;