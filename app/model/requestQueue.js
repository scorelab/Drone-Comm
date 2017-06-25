/**
 * TODO class level comment
 * @author Amila Karunathilaka
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var SchemaTypes = mongoose.SchemaTypes;

var requestQueueSchema = new Schema({
    userId : {type: SchemaTypes.ObjectId, ref: 'user'},
    queue: [{type: SchemaTypes.ObjectId, ref: 'droneRequest'}]
});

var requestQueue = mongoose.model("requestQueue", requestQueueSchema);

module.exports = requestQueue;