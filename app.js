
/**
 * Module dependencies.
 */
var express = require('express');
var connect = require('connect');
var routesView = require('./app/routes/view');
var routesCalendar = require('./app/routes/calendar');
var routesEvent = require('./app/routes/event');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));
app.use('/img', express.static(path.join(__dirname, 'img')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty = true;
}


app.get('/view', routesView.view);
app.get('/view-source', routesView.viewSource);

app.post('/calendars/save', routesCalendar.calendarSave);
app.post('/calendars/delete/:id', routesCalendar.calendarDelete);

app.post('/events/load', routesEvent.eventsLoad);
app.post('/events/save', routesEvent.eventSave);
app.post('/events/delete/:id', routesEvent.eventDelete);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
