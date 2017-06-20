/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
    user : {type: Schema.Types.ObjectId, ref: 'user'},
    first_Name : String,
    last_Name : String,
    address : String,
    contact_No : String,
    email : String,
    pictureURL : String
});

profileSchema.post('find', function (doc, next) {
    for (var i =0; i< doc.length;i++){
        if (!doc[i].user) {
            doc.splice(i, i+1);
        }
    }
    next();
});

var profile = mongoose.model("profile", profileSchema);

module.exports = profile;