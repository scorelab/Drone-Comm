/**
 * @author Amila Karunathilaka
 */

var express = require('express');
var profileService = require('../service/profileService');

var router = express.Router();

router.get('/:username', function (req, res, next) {
   profileService.getProfileByUsername(req.params.username /*decoded.name*/, function (err, profile) {
       if(err) {
           return next(err);
       }
       res.send(profile);
   });
});

module.exports = router;