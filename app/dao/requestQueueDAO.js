/**
 * TODO class level comment
 * @author Amila Karunathilaka
 */

var RequestQueue = require('../model/requestQueue');

requestQueueDAO = {};

requestQueueDAO.createQueue = function (userId) {
    var requestQueueObj = new RequestQueue({
        userId: userId,
    });
    requestQueueObj.save(function (err) {
       return err;
    });
};

requestQueueDAO.getQueueList = function (callback) {
    RequestQueue.find({}, 'userId', function (err, queues) {

        callback(err, queues);
    })
};

requestQueueDAO.enqueue = function (userId, requestId, callback) {
    RequestQueue.update({userId: userId}, {$push: {queue: requestId}}, function (err) {
        callback(err);
    });
};

requestQueueDAO.dequeueOne = function (userId, callback) {
    RequestQueue.findOne({userId: userId}, function (err, requestQueue) {
        callback(err, requestQueue.queue[0])
    });
};




module.exports = requestQueueDAO;