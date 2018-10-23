// storeUsers.js
// get list of users from AGOL
var request = require('request');
var AppDAO = require('./AppDAO');
var UserRepository = require('./UserRepository');
var getRole = require('./getRole');
var getLicenses = require('./getLicenses');

var storeUsers = (TOKEN, PORTALID, PROLISTINGID) => {
  var dao = new AppDAO(`./data/${Date.now()}.sqlite`);
  var userRepo = new UserRepository(dao);

  function getUsers(start = 1, num = 10, cb) {
    var options = {
      method: 'POST',
      url: `https://www.arcgis.com/sharing/rest/portals/${PORTALID}/users`,
      json: true,
      form: {
        f: 'json',
        token: TOKEN,
        start,
        num
      }
    };

    function _submitRequest() {
      request(options, (err, resp, body) => {
        if(err) cb(true);
        if(start == 1) console.log(`Storing ${body.total} users into database`);
        console.log(`${start} - ${start + body.users.length - 1}`);

        var writeUsers = (users) => {

          var i = 0;
          var writeUser = (user) => {
            return getRole(TOKEN, PORTALID, user.role).then((role) => {
              if(role) {
                user.role = role;
              } else {
                user.role = user.role.split('_')[1];
                user.role = capitalizeFirstLetter(user.role);
              }

              // user.tags = user.tags.join(',');
              user.tag_primary = user.tags[0] || '';
              user.tag_secondary = user.tags[1] || '';

              return getLicenses(TOKEN, user.username, PROLISTINGID).then((proLicenses) => {
                user.pro_licenses = proLicenses.join(',');

                return userRepo.create(user).then(() => {
                  if (i == (users.length - 1)) {
                    return new Promise((resolve, reject) => {
                      resolve();
                    });
                  }
                  return writeUser(users[++i]);
                });
              }, console.log)
            });
          }

          writeUser(users[i]).then(() => {
            if(body.nextStart == -1) {
              // resolve
              cb();
            } else {
              getUsers(body.nextStart, 10, cb);
            }
          });
        }
        if(start == 1) {
          userRepo.createTable().then(() => {
            writeUsers(body.users)
          });
        } else {
          writeUsers(body.users);
        }
      })
    }

    try {
      // requests can at times err out with econnreset
      _submitRequest();
    } catch (err) {
      console.log(err);
      _submitRequest();
    }

  }

  return new Promise((resolve, reject) => {
    function cb(err) {
      if(err) reject();
      resolve();
    }
    return getUsers(1, 10, cb);
  })
}

// helper function
function capitalizeFirstLetter(string) {
    if(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return '';
    }
}

module.exports = storeUsers
