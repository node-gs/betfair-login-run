var https = require('https');
var fs = require('fs');
var settings = require('./settings.js');

var commands = (function(){

  function login(next){

      
      // delayed:
      //    live:
      var options = {
        hostname: 'identitysso-api.betfair.com',
        port: "443",
        path: '/api/certlogin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': settings.data.length,
          'X-Application': settings.appKey
        },
        key: fs.readFileSync('../auth/client-2048.key'),
        cert: fs.readFileSync('../auth/client-2048.crt')
      };
      options.agent = new https.Agent(options);

      var req = https.request(options, function(res) {
        console.log("statusCode:", res.statusCode);

        var responseData = "";
        res.on('data', function(d) {
           responseData += d;
        });


        res.on('end', function(d) {
           var response = JSON.parse(responseData);
           console.log("sessionToken:", response.sessionToken.replace(/\d/g, ''));
           var ssid = response.sessionToken;
           next(ssid);
        });


        res.on('error', function(e) {
          console.error(e);
        });
      });

      req.end(settings.data);
  }
  


return {
  login: login
}

})();

module.exports = commands;
