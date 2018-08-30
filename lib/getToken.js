// getToken.js
// returns ArcGIS Online token for authenticated requests
var request = require('request');

var getToken = (CLIENTID, CLIENTSECRET) => {
  var options = {
    method: 'POST',
    url: 'https://www.arcgis.com/sharing/rest/oauth2/token',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      client_id: CLIENTID,
      client_secret: CLIENTSECRET,
      grant_type: 'client_credentials'
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, resp, body) => {
      if(err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    })
  })
}

module.exports = getToken;
