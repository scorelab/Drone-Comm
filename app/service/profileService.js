/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var profileDAO = require('../dao/profileDAO');

profileService = {};

profileService.insertProfile = function (profile, callback) {
    profileDAO.insert(profile, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, {success: true});
    });
};

profileService.getProfileByUsername = function(username, callback){
    profileDAO.findByUserName(username, function (err, profile) {
        console.log(err, profile);
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        delete profile._id;
        delete profile.__v;
        callback(null, profile);
    })
};

profileService.removeProfile = function (userId, callback) {
    profileDAO.remove(userId, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        callback(null, {success: true});
    });
}

/*profileService.updateProfile = function (username, profile, callback) {

};*/

profileService.registerAsAPilot = function (username, callback) {
    profileDAO.findByUserName(username, function (err, profile) {
        if (err) {
           // profile.
        }
    })
};

module.exports = profileService;
