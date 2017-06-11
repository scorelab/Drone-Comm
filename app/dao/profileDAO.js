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

module.exports = profileDAO;