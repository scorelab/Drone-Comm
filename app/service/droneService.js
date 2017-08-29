/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var droneDAO = require('../dao/droneDAO');

droneService = {};

droneService.addDrone = function (userId, drone, callback) {
    drone.userId = userId;
    droneDAO.insert(drone, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }

        return callback(null, {success: true});
    });
};

module.exports = droneService;
