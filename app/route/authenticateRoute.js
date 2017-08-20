/**
 * @author Amila Karunathilaka
 */

var express = require('express');

var authService = require('../service/authenticationService');
var verificationTokenService = require('../service/emailVerificationTokenService');

var verificationMailSender = require('../util/verificationMailSender');

var router = express.Router();

router.post('/authenticate/:name/:password', function (req, res, next) {
    authService.login(req.params.name, req.params.password, function (err, response) {
       if (err) {
           return next(err);
       }
       res.send(response);
    });
});


router.post('/register', function (req, res, next) {
    console.log(req.body);
    authService.register(req.body, function (err, response) {
        if (err) {
            return next(err);
        }
        verificationMailSender.sendMail(req.get('origin'), response.token, response.email, function (err, success) {
            if (err) {
                return next(err);
            }

            var resp = {
                msg : 'Successfully registered user',
                errorCode:  0
            };
            res.send(resp);
        });
    });
});


router.get('/resend/:name', function (req, res, next) {
    verificationTokenService.resendToken(req.params.name, function (err, response) {
        if (err) {
            return next(err);
        }
        verificationMailSender.sendMail(req.get('host'), response.token, response.email, function (err, success) {
            if (err) {
                return next(err);
            }

            var resp = {
                msg : 'Successfully resend email verification',
                errorCode:  0
            };
            res.send(resp);
        });

})
});

router.get('/verify', function (req, res, next) {
    verificationTokenService.verifyToken(req.query.id, function (err, resp) {
        if (err) {
            return next(err);
        }

        var response = {
            msg : 'Successfully verified user',
            errorCode:  0
        };
        res.send(response);
    })
});

module.exports = router;