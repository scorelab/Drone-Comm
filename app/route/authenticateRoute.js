/**
 * @author Amila Karunathilaka
 */

var express = require('express');
var authService = require('../service/authenticationService');

var router = express.Router();


router.post('/authenticate/:name/:password', function (req, res, next) {
    authService.login(req.params.name, req.params.password, function (err, response) {
       if (err) {
           return next(err);
       }
       res.send(response);
    });
});

module.exports = router;