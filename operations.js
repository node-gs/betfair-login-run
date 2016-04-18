var utilities = require('./utilities.js');
var https = require('https');
var settings = require('./settings.js');


var operations = (function(){


// Construct request and POST it to API-NG
    function findMarketIds(options, next) {
        console.log("Get Market ids");
        // Define filter object
        var requestFilters = '{"filter":{}}';
        var jsonRequest = utilities.constructJsonRpcRequest('listEventTypes', requestFilters );
        var str = '';
        var req = https.request(options,function (res){
            res.setEncoding(settings.DEFAULT_ENCODING);
            res.on('data', function (chunk) {
                str += chunk;
                console.log(str);
            });

            res.on('end', function (chunk) {
                // On resposne parse Json and check for errors
                var response = JSON.parse(str);
                utilities.handleError(response);

                return next(str);
            });
            
        });
        // Send Json request object
        req.write(jsonRequest, settings.DEFAULT_ENCODING);
        req.end();

        req.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        }); 
    }

    function secondFunction(){
        console.log("this is the second function");
    }

    return {
    	findMarketIds: findMarketIds,
        secondFunction:secondFunction
    }
})();

module.exports = operations;