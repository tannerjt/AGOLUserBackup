// getRole.js
// get custom role by roleid
// reference: https://developers.arcgis.com/rest/users-groups-and-items/role.htm
var request = require('request');

var token, user, proID;

var getLicenses = (TOKEN, USER, PROLISTINGID) => {
  token = TOKEN;
  user = USER;
  listingId = PROLISTINGID;

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

    function _submitRequest() {
      request(options, (err, resp, body) => {
        if(err) {
          console.log(err);
          reject(err);
        } else {
          var entitlements = (body.userEntitlements) ? body.userEntitlements.entitlements : [];
          resolve(entitlements);
        }
      });
    }

    try {
      _submitRequest();
    } catch (err) {
      console.log(err);
      _submitRequest();
    }
  });
};

module.exports = getLicenses;

// old problematic code for getting purchase IDS dynamically
// function _getPurchaseIds() {
//   var options = {
//     method: 'POST',
//     json: true,
//     url: `https://www.arcgis.com/sharing/rest/portals/self/purchases`,
//     form: {
//       f: 'json',
//       token: token
//     }
//   };
//
//   return new Promise((resolve, reject) => {
//
//     function _submitRequest() {
//       request(options, (err, resp, body) => {
//         if (body.purchases && body.purchases.length > 1) {
//           var proListing = body.purchases.filter((item, idx) => {
//             if(!item.hasOwnProperty('listing')) return false;
//             return item.listing.title == 'ArcGIS Pro';
//           });
//         } else {
//           return [];
//         }
//         if(err) {
//           reject(err);
//         } else {
//           resolve(proListing[0].listing.itemId);
//         }
//       });
//     }
//
//     try {
//       _submitRequest();
//     } catch (err) {
//       console.log(err);
//       _submitRequest();
//     }
//   });
// }
