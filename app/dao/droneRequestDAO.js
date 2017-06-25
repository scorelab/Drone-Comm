/**
 * TODO class level comment
 *
 * @author Amila Karunathilaka
 */

var DroneRequest = require('../model/droneRequest');

droneRequestDAO = {};

droneRequestDAO.insert = function (droneRequest, callback) {
    droneRequestDAO.getLatestRequestId(droneRequest.userId, function (err, id) {
        if (err) {
            return callback(err);
        }
        droneRequest.id = ++id;

        var droneRequestObj = new DroneRequest(droneRequest);
        droneRequestObj.save(function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, id);
        });
    });

};


droneRequestDAO.getRequestById = function (userId, Id, callback) {
    DroneRequest.findOne({userId: userId, id: id}, function (err, request) {
        callback(err, request);
    })
};

droneRequestDAO.getLatestRequestId = function (userId, callback) {
    DroneRequest.findOne({userId: userId}, {}, {sort: {'id': -1 }}, function (err, request) {
        callback(err, request.id);
    });
};


module.exports = droneRequestDAO;



