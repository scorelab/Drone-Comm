/**
 * TODO class level comment
 *
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var droneSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'user'},
    name : String,
    specification : String
});

var drone = mongoose.model("drone", droneSchema);

module.exports = drone;