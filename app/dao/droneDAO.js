/**
 * @author Amila Karunathilaka
 */

var Drone = require('../model/drone');

droneDAO = {};

droneDAO.insert = function (drone, callback) {
    var droneObj = new Drone(drone);
    droneObj.save(function (err) {
        callback(err);
    })
};


module.exports = droneDAO;