// getToken.js
// returns ArcGIS Online token for authenticated requests
var request = require('request');

var getToken = (USERNAME, PASSWORD) => {
  var options = {
    method: 'POST',
    url: 'https://www.arcgis.com/sharing/rest/generateToken',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      username: USERNAME,
      password: PASSWORD,
      f: 'json',
      referer: 'cli-app-placeholder'
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
