/**
 * @author Amila Karunathilaka
 */

/**
 * @author Amila Karunathilaka
 */


var express = require('express');
var droneRequestService = require('../service/droneRequestService');

var router = express.Router();

router.post('/', function (req, res, next) {
    droneRequestService.createRequest(req.decoded.userId, req.body, function (err, response) {
        if (err) {
            return next(err);
        }

        var resp = {
            msg: 'Successfully created drone request',
            errorCode: 0
        };
        res.send(resp);
    });
});

router.put('/', function (req, res, next) {
    droneRequestService.updateRequest(req.decoded.userId, req.body, function (err, response) {
        if (err) {
            return next(err);
        }

        var resp = {
            msg: 'Successfully updated drone request',
            errorCode: 0
        };
        res.send(resp);
    });
});

router.post('/close/:id', function (req, res, next) {
    droneRequestService.droneRequestClose(req.decoded.userId, req.params.id, function (err, result) {
        if (err) {
            return next(err);
        }

        var resp = {
            msg: 'Successfully closed drone detail request',
            errorCode: 0
        };
        res.send(resp);
    })
});

router.get("/all", function (req, res, next) {
    droneRequestService.findAllDroneRequest(req.decoded.userId, function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(result);
    })

});

router.get("/", function (req, res, next) {
    droneRequestService.searchDroneRequest(req.decoded.userId, req.query.searchkey, function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(result);
    })

});

router.get("/:id", function (req, res, next) {
    droneRequestService.findDroneRequest(req.decoded.userId, req.params.id, function (err, result) {
        if (err) {
            return next(err);
        }

        res.send(result);
    })

});

module.exports = router;