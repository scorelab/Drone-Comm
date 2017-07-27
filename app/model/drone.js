/**
 * TODO class level comment
 *
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
require('mongoose-double')(mongoose);

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var droneSchema = new Schema({
    userId : {type: Schema.Types.ObjectId, ref: 'user'},
    name : String,
    weight: SchemaTypes.Double,
    maxFightTime: Number,
    maxCelling: SchemaTypes.Double,
    satelliteSystem: String,
    cameraSpec: [{
        spec: String,
        value: String
    }],
    cameraGimbalSpec: [{
        spec: String,
        value: String
    }],
    otherSpec: [{
        spec: String,
        value: String
    }]
});

var drone = mongoose.model("drone", droneSchema);

module.exports = drone;