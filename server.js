/**
 * Module dependencies.
 */
var express = require('express'),
    api = require('./routes/api');
var app = express();

// Configuration

// ## CORS middleware
// 
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

var checkApiKey = function(req, res, next) {
  if (req.query.apikey == null) {
    res.send(401, { error: 'No API key supplied.' });
  }
  else if (req.query.apikey != api.getApiKey()) {
    res.send(401, { error: 'API key is invalid.' });
  }
  else {
    next();
  }
};

app.configure(function(){
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(express.bodyParser());
  app.use(checkApiKey);
});

// JSON API
app.get('/switches', api.switches);
app.get('/switches/:id', api.switch);
app.get('/switches/:id/switch', api.editSwitch);
app.get('/groups', api.groups);
app.get('/groups/:id', api.group);
app.get('/groups/:id/switch', api.editGroup);

// Start server
app.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");