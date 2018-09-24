// getRole.js
// get custom role by roleid
// reference: https://developers.arcgis.com/rest/users-groups-and-items/role.htm
var request = require('request');

var token, user, proID;

var getLicenses = (TOKEN, USER) => {
  token = TOKEN;
  user = USER;

  return new Promise((resolve, reject) => {
    return _getPurchaseIds()
            .then(_getProLicenses)
            .then((resp) => {
              resolve(resp);
            })
  });
};

function _getPurchaseIds() {
  var options = {
    method: 'POST',
    json: true,
    url: `https://www.arcgis.com/sharing/rest/portals/self/purchases`,
    form: {
      f: 'json',
      token: token
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, resp, body) => {
      var proListing = body.purchases.filter((item, idx) => {
        if(!item.hasOwnProperty('listing')) return false;
        return item.listing.title == 'ArcGIS Pro';
      });
      if(err) {
        reject(err);
      } else {
        resolve(proListing[0].listing.itemId);
      }
    });
  });
}

function _getProLicenses(listingId) {
  var options = {
    method: 'POST',
    json: true,
    url: `https://www.arcgis.com/sharing/rest/content/listings/${listingId}/userEntitlements/${user}`,
    form: {
      f: 'json',
      token: token
    }
  };

  return new Promise((resolve, reject) => {
    request(options, (err, resp, body) => {
      if(err) {
        reject(err);
      } else {
        var entitlements = (body.userEntitlements) ? body.userEntitlements.entitlements : [];
        resolve(entitlements);
      }
    });
  });
}

module.exports = getLicenses;
