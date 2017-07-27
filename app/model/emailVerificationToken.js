/**
 * @author Amila Karunathilaka
 */

const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let emailVerificationTokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    token: String,
    expiredDate: Date
});

let emailVerificationToken = mongoose.model('emailVerificationToken', emailVerificationTokenSchema);

module.exports = emailVerificationToken;