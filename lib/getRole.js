// getRole.js
// get custom role by roleid
// reference: https://developers.arcgis.com/rest/users-groups-and-items/role.htm
var request = require('request');

var getRole = (TOKEN, PORTALID, ROLEID) => {
  var options = {
    method: 'POST',
    json: true,
    url: `https://www.arcgis.com/sharing/rest/portals/${PORTALID}/roles/${ROLEID}`,
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
        resolve(body.name);
      }
    });
  });
}

module.exports = getRole;
