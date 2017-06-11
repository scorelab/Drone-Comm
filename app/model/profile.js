/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var profileSchema = new Schema({
    username : String,
    name : String,
    address : String,
    contact_No : String,
    email : String,
    pictureURL : String
});

var profile = mongoose.model("profile", profileSchema);

module.exports = profile;