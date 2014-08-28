//execute commands
var util = require('util')
var exec = require('child_process').exec;
var sleep = require('sleep');
var config = require('../config.js')


var apiKey = config.apiKey;
var switches = config.switches;
var groups = config.groups;

exports.getApiKey = function() {
	return apiKey;
}

exports.switches = function (req, res) {
  console.log('Getting switches.');
  res.json(switches);
};

exports.switch = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < switches.length) {
    res.json(switches[id]);
  } else {
    res.json(404);
  }
};

exports.groups = function (req, res) {
  console.log('Getting groups.');
  res.json(groups);
};

exports.group = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < groups.length) {
    res.json(groups[id]);
  } else {
    res.json(404);
  }
};

exports.editSwitch = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id <= switches.length) {
    console.log('Switch Status of switch with id: ' + id + " to " + req.query.status);
    var script = switches[id].script;
    var command = switches[id].command;
    switchStatus(script,command,req.query.status);
    switches[id].status = req.query.status;
    res.send(200);
  } else {
    res.json(404);
  }
};

exports.editGroup = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id <= groups.length) {
    console.log('Switch Status of group with id: ' + id + " to " + req.query.status);
    for (var i=0; i<groups[id].switches.length; i++){
    	var switchId = groups[id].switches[i];
	 	var script = switches[switchId].script;
	    var command = switches[switchId].command;
	    switchStatus(script,command,req.query.status);
	    switches[switchId].status = req.query.status;	
    }
    res.send(200);
  } else {
    res.json(404);
  }
};


function switchStatus(script, command, status){
    var execString = script + " " + command + " " + status;
    console.log("Executing: " + execString);
    exec(execString, puts);
    sleep.sleep(1)//sleep for 1 seconds
}

function puts(error, stdout, stderr) { 
        util.puts(stdout); 
        console.warn("Executing Done");
}