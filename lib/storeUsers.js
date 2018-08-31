// storeUsers.js
// get list of users from AGOL
var request = require('request');
var AppDAO = require('./AppDAO');
var UserRepository = require('./UserRepository');

// first get number or total user
// THEN
// for loop how every many requests needed
// push each promise into an array
// return promise.all()

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
      //write to db
      if(body.nextStart == -1) {
        // resolve
        cb();
      } else {
        getUsers(body.nextStart, 10, cb);
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
