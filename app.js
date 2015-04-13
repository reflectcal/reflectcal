/*
 * Copyright (c) 2015. Rflect, Alex K.
 */


/**
 * Module dependencies.
 */
var express = require('express');
var connect = require('connect');
var routesView = require('./app/routes/view');
var routesLogin = require('./app/routes/login');
var routesCalendar = require('./app/routes/calendar');
var routesSettings = require('./app/routes/settings');
var routesUser = require('./app/routes/user');
var routesEvent = require('./app/routes/event');
var daemonNotifications = require('./app/daemons/notifications');
var settingsDAO = require('./app/db/settings');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
var login = require('./app/util/login');
var flash = require('connect-flash');
var appConfig = require('./app/config/appconfig');
var log = appConfig.log;
var db = require('./app/db/connection').db;
var oauthHelper = require('./app/util/oauthhelper');
var registerUser = require('./app/util/users').registerUser;
var unregisterUser = require('./app/util/users').unregisterUser;
var dbUtil = require('./app/db/util');
var getEntitiesWithPromise = require('./app/db/entity').getEntitiesWithPromise;

var app = express();

// all environments
app.set('port', appConfig.APP_PORT);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(connect.urlencoded());
app.use(connect.json());
app.use(connect.compress());
app.use(express.methodOverride());
app.use(express.cookieParser(
    'rflectevents_sdfjwioy2379ugd8syg38wyio-asdfh728t9284fdsfjs'));
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'static')));

if (appConfig.USE_OAUTH) {
  // API Access link for creating client ID and secret:
  // https://code.google.com/apis/console/
  var credentials = oauthHelper.getCredentialsObject();
  var GOOGLE_CLIENT_ID = credentials.web.client_id;
  var GOOGLE_CLIENT_SECRET = credentials.web.client_secret;
  var CALLBACK_URL = credentials.web.redirect_uris[0];
  // Use the GoogleStrategy within Passport.
  // Strategies in Passport require a `verify` function, which accept
  // credentials (in this case, an accessToken, refreshToken, and Google
  // profile), and invoke a callback with a user object.
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
  }, login.googleStrategy));
} else {
}
passport.use(new LocalStrategy(login.localStrategy));

passport.serializeUser(login.serializeUser);
passport.deserializeUser(login.deserializeUser);

// development only
if ('development' == app.get('env')) {
  app.use('/js', express.static(path.join(__dirname, 'js')));
  app.use('/css', express.static(path.join(__dirname, 'css')));
  app.use('/font', express.static(path.join(__dirname, 'font')));
  app.use('/src', express.static(path.join(__dirname, 'src')));
  app.use('/templates', express.static(path.join(__dirname, 'templates')));

  app.use(express.errorHandler());
  app.locals.pretty = true;
}

if (appConfig.USE_LOCAL_AUTH) {
  //Local strategy form post.
  app.post('/login', loginHandler, function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    log.info(req.user);
    res.redirect('/');
  });
}
app.get('/', ensureAuthenticated, registerUser, routesView.render);
app.get('/login', routesLogin.render);
var loginHandler = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});
//Guest mode.
app.get('/guest', login.checkGuestMode(loginHandler), ensureAuthenticated,
    registerUser, routesView.render);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
}, unregisterUser);

if (appConfig.USE_OAUTH) {
  // GET /auth/google
  // Use passport.authenticate() as route middleware to authenticate the
  // request. The first step in Google authentication will involve
  // redirecting the user to google.com. After authorization, Google
  // will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
  }), function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });
  // GET /auth/google/callback
  // Use passport.authenticate() as route middleware to authenticate the
  // request. If authentication fails, the user will be redirected back to the
  // login page. Otherwise, the primary route function function will be called,
  // which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
  }), function(req, res) {
    res.redirect('/');
  });
}

app.post('/calendars/save', ensureAuthenticated, routesCalendar.calendarSave);
app.post('/calendars/delete/:id', ensureAuthenticated, routesCalendar.calendarDelete);
app.post('/events/load', ensureAuthenticated, routesEvent.eventsLoad);
app.post('/events/save', ensureAuthenticated, routesEvent.eventSave);
app.post('/events/delete/:id', ensureAuthenticated, routesEvent.eventDelete);
app.post('/user/save', ensureAuthenticated, routesUser.userSave);

// Simple route middleware to ensure user is authenticated.
// Use this route middleware on any resource that needs to be protected. If
// the request is authenticated (typically via a persistent login session),
// the request will proceed. Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// Execute commands in clean exit.
process.on('exit', function () {
  log.info('Exiting...');
  if (null != db) {
    db.close();
  }
  daemonNotifications.stop();
});

// Happens when you press Ctrl+C.
process.on('SIGINT', function () {
  log.info('\nGracefully shutting down from SIGINT.');
  process.exit();
});

// Usually called with kill.
process.on('SIGTERM', function () {
  log.info('\nParent SIGTERM detected (kill).');
  process.exit(0);
});

//Start an application.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
//Start notifications daemon.
if (appConfig.USE_WEBSOCKETS_NOTIFICATIONS) {
  daemonNotifications.start();
}
