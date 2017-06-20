/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var droneDAO = require('../dao/droneDAO');

droneService = {};

droneService.addDrone = function (drone, callback) {
    droneDAO.insert(drone, function (err) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
    })
};

module.exports = droneService;
