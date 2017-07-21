/**
 * @author Amila Karunathilaka
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name : String,
    password : String,
    active: Boolean,
    roles : [String]
});

/**
 * username duplicate validation
 */
userSchema.pre("save", function (next) {
   var self = this;
    mongoose.models["user"].findOne({name: self.name}, function (err, user) {
        console.log(user._id, self._id);
        if (err) {
            next(err);
        }  else if (!user._id.equals(self._id) && user) {
            self.invalidate("username", "username currently available");
            next(new Error("username currently available"));
        }
        next();
    });
});

var user = mongoose.model("user", userSchema);

module.exports = user;