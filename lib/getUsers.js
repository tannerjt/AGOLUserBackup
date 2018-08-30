// getUsers.js
// get list of users from AGOL
var request = require('request');

var getUsers = (TOKEN, cb) => {
  var options = {
    method: 'POST',
    url: 'https://www.arcgis.com/sharing/rest/portals/uUvqNMGPm7axC2dD/users',
    json: true,
    form: {
      f: 'json',
      token: TOKEN
    }
  };
  return new Promise((resolve, reject) => {
    request(options, (err, resp, body) => {
      if(err) {
        reject(err);
      } else {
        // TODO: wait to resolve until stored all users
        resolve();
      }
    })
  })
}

module.exports = getUsers
