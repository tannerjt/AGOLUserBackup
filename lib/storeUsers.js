// storeUsers.js
// get list of users from AGOL
var request = require('request');
var AppDAO = require('./AppDAO');
var UserRepository = require('./UserRepository');

var storeUsers = (TOKEN) => {
  var dao = new AppDAO(`./data/${Date.now()}.sqlite`);
  var userRepo = new UserRepository(dao);

  function getUsers(start = 1, num = 10, cb) {
    var options = {
      method: 'POST',
      url: 'https://www.arcgis.com/sharing/rest/portals/uUvqNMGPm7axC2dD/users',
      json: true,
      form: {
        f: 'json',
        token: TOKEN,
        start,
        num
      }
    };

    request(options, (err, resp, body) => {
      if(err) cb(true);
      if(start == 1) console.log(`Storing ${body.total} users into database`);
      console.log(`${start} - ${start + body.users.length - 1}`);

      var writeUsers = (users) => {

        var i = 0;
        var writeUser = (user) => {
          return userRepo.create(user).then(() => {
            if (i == (users.length - 1)) {
              return new Promise((resolve, reject) => {
                resolve();
              });
            }
            return writeUser(users[++i]);
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

  return new Promise((resolve, reject) => {
    function cb(err) {
      if(err) reject();
      resolve();
    }
    return getUsers(1, 10, cb);
  })
}

module.exports = storeUsers
