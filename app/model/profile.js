/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    username : String,
    first_Name : String,
    last_Name : String,
    address : String,
    contact_No : String,
    email : String,
    pictureURL : String
});

var profile = mongoose.model("profile", profileSchema);

module.exports = profile;