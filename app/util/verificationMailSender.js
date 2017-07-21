/**
 * @author Amila Karunathilaka
 */

const droneCommServiceError = require('../util/error/DroneCommServiceError');

const nodeMailer = require('nodemailer');

verificationMailSender = {};

let smtpTransport = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'amilakarunathilaka@gmail.com',
        pass: 'viewsonic@E70f'
    }
});

var protocol = "http://";
var urn = "/verify?id=";

verificationMailSender.sendMail = function (host, token, email, callback) {
    var link = host + urn + token;
    var mailOption = {
        from: 'Drone Comm<' + email + ">",
        to: email,
        subject: "Please confirm your Email",
        html: "Hi,<br> Please Click on the link to verify your email.<br>" +
        "<a href=" + link + "> Click here to verify</a>"
    };
    smtpTransport.sendMail(mailOption, function (err, response) {
        if (err) {
            return callback(new droneCommServiceError("Email sending error", err));
        }
        console.log(response);
        callback(null, {success: true})
    });
};

module.exports = verificationMailSender;