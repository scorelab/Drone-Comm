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
            return callback(new droneCommServiceError("Database Connection Error", err));
        }
        droneRequestDAO.getRequestByIdAndUserId(user._id, id, function (err, request) {
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
};

droneRequestService.findDroneRequest = function (userId, _id, callback) {
    droneRequestDAO.getRequestByIdAndUserId(userId, _id, function (err, request) {
        if (err) {
            return callback(new droneCommServiceError("Retrieving drone request error with _id: " + _id, err));
        }
        callback(null, request);
    })
};

droneRequestService.findAllDroneRequest = function (userId, callback) {
    droneRequestDAO.findAll(userId, function (err, droneRequests) {
        if (err) {
            return callback(new droneCommServiceError("Retrieving all drone request error", err));
        }

        callback(null, droneRequests);
    });
};

droneRequestService.searchDroneRequest = function (userId, searchKey, callback) {
    droneRequestDAO.search(userId, searchKey, function (err, droneRequests) {
        if (err) {
            return callback(new droneCommServiceError("Retrieving search drone request error" , err));
        }

        callback(null, droneRequests);
    })
};

droneRequestService.droneRequestClose = function (username, id, callback) {
    userDAO.getUser(username, function (err, user) {
        if (err) {
            return callback(new droneCommServiceError("Close drone request error with username :" + username, err));
        }

        droneRequestDAO.getRequestByIdAndUserId(user._id, id, function (err, request) {
            if (err) {
                return callback(new droneCommServiceError("Close drone request error with username :" + username, err));
            }
            request.active = false;
            droneRequestDAO.insert(request, function (err) {
                if (err) {
                    return callback(new droneCommServiceError("Close drone request error with username :" + username, err));
                }
            });
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
