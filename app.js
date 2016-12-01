var express = require('express');  //done
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');    //done
var cookieParser = require('cookie-parser');  //done
var bodyParser = require('body-parser');    //done
var session = require('express-session');  //done
var mongoose = require ('mongoose'); //done

var passport = require('passport');
var flash = require('connect-flash');
var fs =require('fs');

var configDB = require('./config/database.js');  //database configuration path location
mongoose.connect(configDB.url);     // Connects to database

require('./config/passport')(passport);
var passport_path = require('./config/passport.js');


var app = express();    //done

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');  //done

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));    //done
app.use(cookieParser());
app.use(session({secret:'anystring',
                    saveUninitialized: true,
                    resave: true}));

app.use(passport.initialize());
app.use(passport.session());     // Persistent login session
app.use(flash());               // use connect-flash for flash message

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  //done
app.use(cookieParser());


//check for login
//app.use();

//routes location is defined hear
var routes = require('./routes/index');
var users = require('./routes/users');
var signup =require ('./routes/signup');
var login = require('./routes/login');
var profile = require ('./routes/profile');
var logout = require('./routes/logout');

//routes are passed hear

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/signup', signup);
app.use('/login',login);
app.use('/profile',profile);
app.use('/logout', logout);

app.use('/test', function (req, res){
 res.send('Ping');
  console.log(req.cookies);
  console.log('*************************');
  console.log(req.session);
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
