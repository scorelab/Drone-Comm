/**
 * @author Amila Karunathilaka
 */

var droneCommServiceError = require('../util/error/DroneCommServiceError');

var droneRequestDAO = require('../dao/droneRequestDAO');
var requestQueueDAO = require('../dao/requestQueueDAO');
var userDAO = require('../dao/userDAO');

droneRequestService = {};

droneRequestService.createRequest = function (userId, request, callback) {
    request.userId = userId;
    droneRequestDAO.insert(request, function (err, id) {
        if (err) {
            return callback(new droneCommServiceError("Drone request creating error", err));
        }
        droneRequestDAO.getRequestByIdAndUserId(userId, id, function (err, request) {
            if (err) {
                return callback(new droneCommServiceError("Drone request creating error", err));
            }
            addRequestToQueues(request._id, function (err) {
                if (err) {
                    return callback(new droneCommServiceError("Error occur when drone request adding to queues", err));
                }
                callback(null, {success: true});
            });
        });
    });
};

droneRequestService.updateRequest = function (userId, request, callback) {
    request.userId = userId;
    droneRequestDAO.insert(request, function (err, id) {
        if (err) {
            return callback(new droneCommServiceError("Drone request creating error", err));
        }
        callback(null, {success: true});
    });
};

droneRequestService.findDroneRequest = function (userId, _id, callback) {
    droneRequestDAO.getRequestByIdAndUserId(userId, _id, function (err, request) {
        if (err) {
            return callback(new droneCommServiceError("Drone request retrieving error with _id: " + _id, err));
        }
        callback(null, request);
    })
};

droneRequestService.findAllDroneRequest = function (userId, callback) {
    droneRequestDAO.findAll(userId, function (err, droneRequests) {
        if (err) {
            return callback(new droneCommServiceError("All drone request retrieving error", err));
        }

        callback(null, droneRequests);
    });
};

droneRequestService.searchDroneRequest = function (userId, searchKey, callback) {
    droneRequestDAO.search(userId, searchKey, function (err, droneRequests) {
        if (err) {
            return callback(new droneCommServiceError("drone request searching error", err));
        }

        callback(null, droneRequests);
    })
};

droneRequestService.droneRequestClose = function (userId, id, callback) {
    droneRequestDAO.getRequestByIdAndUserId(userId, id, function (err, request) {
        if (err) {
            return callback(new droneCommServiceError("Drone request closing error with username :" + username, err));
        }
        request.active = false;
        droneRequestDAO.insert(request, function (err) {
            if (err) {
                return callback(new droneCommServiceError("Drone request closing error with username :" + username, err));
            }
            callback(null, {success: true});
        });
    });
};


var addRequestToQueues = function (requestId, callback) {
    requestQueueDAO.getQueueList(function (err, queueUserIds) {
        var count = 0;
        for (var i = 0; i < queueUserIds.length; i++) {
            requestQueueDAO.enqueue(queueUserIds[i], requestId, function (err) {
                if (err) {
                    return callback(err);
                }
                count++;
                if (count == queueUserIds.length) {
                    return callback(null, {success: true});
                }
            });
        }
    });
};

module.exports = droneRequestService;
