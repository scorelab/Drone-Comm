/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var droneSchema = new Schema({
    username : String,
    name : String,
    specification : String
});

var drone = mongoose.model("drone", droneSchema);

module.exports = drone;