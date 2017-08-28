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

droneDAO.findByIdAndUserId = function (userId, id, callback) {
    Drone.findOne({id: id, userId: userId}, function (err, drone) {
        callback(err, drone);
    });
};

droneDAO.findById = function (userId, id, callback) {
    Drone.findOne({id: id}, function (err, drone) {
        callback(err, drone);
    });
};

droneDAO.findAllByIdUserId = function (userId, callback) {
    Drone.find({userId: userId}, function (err, drones) {
        callback(err, drones);
    });
};

module.exports = droneDAO;