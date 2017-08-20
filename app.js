var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var dbConnection = mongoose.connection;
dbConnection.on('error', console.error.bind(console, 'Connection Error:'));
dbConnection.once('open', function () {
    console.log('Database connected.....')
});

mongoose.connect('mongodb://mongo:27017/DroneCommDB');

var authenticationFilter = require('./app/util/auth/authenticationFilter');
var authRoute = require('./app/route/authenticateRoute');
var profileRoute = require('./app/route/profileRoute');

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enable cross-origin resource sharing
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'); // Origin, X-Requested-With, Content-Type, Accept, Authorization
    res.setHeader('Access-Contrl-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400'); // important

    if (req.method === 'OPTIONS' ) {
        console.log('OPTIONS SUCCESS');
        res.end("ok");
        //res.end();
    } else {
        next();
    }
})

app.use('/apis', authRoute);

app.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.header['authorization'];
    authenticationFilter.verifyToken(token, function (err, response) {
        if (err) {
          return next(err);
        } else if (response.success) {
          req.decoded = response.decoded;
          next();
        } else {
          return res.json(response);
        }

    });
});

app.use('/profile', profileRoute);
//app.use('/', index);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
    res.json(err);
});

module.exports = app;
