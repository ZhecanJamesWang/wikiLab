
// MODULE IMPORTS ==============================================================

// utility modules
var path           = require('path');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');

// express modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

// database modules
var mongoose       = require('mongoose');

// route modules
var routes         = require('./routes/routes');

// CONFIGURATION ===============================================================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CONNECT TO DATABASE =========================================================
mongoose.connect('mongodb://localhost/test');

// ROUTES ======================================================================

// GET requests
app.get('/api/getTopicList', routes.getTopicList);
app.get('/api/getTopic/:topic_url', routes.getTopic);

// POST requests
app.post('/api/deleteTopic/:topic_url', routes.deleteTopic);
app.post('/api/editTopic/:topic_url', routes.editTopic);

// AngularJS requests
app.get('*', function (req, res) {
	console.log("cannot find the routes!!!")
    res.sendFile(__dirname + '/public/index.html');
});

// START SERVER ================================================================
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Topics running on port:", PORT);
});