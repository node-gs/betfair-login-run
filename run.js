//includes

//include https module
var https = require('https');
//include filesystem module
var fs = require('fs');
//include login function
var commands = require('./commands.js');
//include error handling
var utilities = require('./utilities.js');
//include operations
var operations = require('./operations.js');
//include app settings
var settings = require('./settings.js');

// Main class that contains all operations
function initialiseRequestStructure(ssid){
    //options get set once, then call multiple operations
    var options = {
        hostname: 'api.betfair.com',
        port: 443,
        path: '/exchange/betting/json-rpc/v1',
        method: 'POST',
        headers: {
            'X-Application' : settings.appKey,
            'Accept': 'application/json',
            'Content-type' : 'application/json',
            'X-Authentication' : ssid
            }
    }
    function next () {
        console.log("this is the next function");
    }
    // Start from finding the horse race event type id
    // function start() {
    //     operations.findHorseRaceId(options, operations.secondFunction);
    // }
    function start() {
        operations.findHorseRaceId(options, function(str){
            console.log("I have hit the second function this way");
            console.log(str);
        })
    }
    // function start() {
    //     var firstFunction = operations.findHorseRaceId();
    //     firstFunction.then(
    //         function(){
    //             console.log("second function");
    //         }
    //         ).then(function(){
    //             console.log("third function");
    //         });
    // }
    start();
}

// Start the app
commands.login(initialiseRequestStructure);

