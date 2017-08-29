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

droneRequestDAO.deleteDroneRequest = function (userId, _id, callback) {

};

droneRequestDAO.findAll = function (userId, callback) {
    DroneRequest.find({userId: userId}, function (err, requests) {
        callback(err, requests);
    });

  /*  DroneRequest.find().populate({path:'user', match: {name: username}}).exec(function (err, requests) {
        callback(err, requests);
    });*/
   // { "abc": { $regex: '.*' + colName + '.*' }
};

droneRequestDAO.search = function (userId, searchKey, callback) {
    let regex = new RegExp('^' + searchKey + '$', "i");
    DroneRequest.find( {$or:[{title: regex}, {type: regex}], userId: userId}, function (err, requests) {
        callback(err, requests)
    });
};

droneRequestDAO.findById= function (id, callback) {
    DroneRequest.findOne({id: id}, function (err, request) {
        callback(err, request);
    });
};

droneRequestDAO.getRequestByIdAndUserId = function (userId, Id, callback) {
    DroneRequest.findOne({userId: userId, id: id}, function (err, request) {
        callback(err, request);
    });
};

droneRequestDAO.getLatestRequestId = function (userId, callback) {
    DroneRequest.findOne({userId: userId}, {}, {sort: {'id': -1 }}, function (err, request) {
        callback(err, request.id);
    });
};


module.exports = droneRequestDAO;



