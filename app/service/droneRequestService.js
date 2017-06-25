/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var droneRequestDAO = require('../dao/droneRequestDAO');
var requestQueueDAO = require('../dao/requestQueueDAO');
var userDAO = require('../dao/userDAO');

droneRequestService = {};

droneRequestService.createRequest = function (username, request, callback) {
    userDAO.getUser(username, function (err, user) {
        if (err) {
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        request.userId = user._id;

        droneRequestDAO.insert(request, function (err, id) {
            if (err) {
                return callback(new droneCommServiceError("Database Connection Error", err));
            }
            droneRequestDAO.getRequestById(user._id, id, function (err, request) {
                if (err) {
                    return callback(new droneCommServiceError("Database Connection Error", err));
                }
                addRequestToQueues(request._id, function (err) {
                    if (err) {
                        return callback(new droneCommServiceError("Database Connection Error", err));
                    }
                    callback(null, {success: true});
                });
            });
        });
    });
};

var addRequestToQueues = function (requestId, callback) {
    requestQueueDAO.getQueueList(function (err, queueUserIds) {
        var count = 0;
        for (var i = 0; i < queueUserIds.length; i++){
            requestQueueDAO.enqueue(queueUserIds[i], requestId, function (err) {
                if (err) {
                    return callback(err);
                }
                count++;
                if (count == queueUserIds.length) {
                    callback(null);
                }
            });
        }
    })
};




module.exports = droneRequestService;
