
/**
 * Module dependencies.
 */
var express = require('express');
var connect = require('connect');
var routesView = require('./app/routes/view');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(connect.urlencoded())
app.use(connect.json())
app.use(express.methodOverride());
app.use(express.cookieParser(
    'rflectevents_sdfjwioy2379ugd8syg38wyio-asdfh728t9284fdsfjs'));
app.use(express.session());
app.use(app.router);
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/templates', express.static(path.join(__dirname, 'templates')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/view', routesView.view);
app.get('/view-source', routesView.viewSource);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
