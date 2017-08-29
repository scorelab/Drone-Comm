/**
 * @author Amila Karunathilaka
 */


var express = require('express');
var droneService = require('../service/droneService');

var router = express.Router();

router.post('/', function (req, res, next) {
    droneService.addDrone(req.decoded.userId, req.body, function (err, response) {
        if (err) {
            return next(err);
        }

        var resp = {
            msg: 'Successfully add drone detail',
            errorCode: 0
        };
        res.send(resp);
    });
});

module.exports = router;