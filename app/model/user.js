/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    password : String,
    roles : [String]
});

var user = mongoose.model("user", userSchema);

module.exports = user;