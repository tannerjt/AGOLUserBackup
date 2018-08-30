// AGOLUserBackup
var getToken = require('./lib/getToken.js');
var getUsers = require('./lib/getUsers.js');
require('dotenv').load();

getToken(process.env.USERNAME, process.env.PASSWORD)
.then((resp) => {
  getUsers(resp.token, writeToDB).then((status) => {
    console.log('Completed!')
  })
}, console.log);

function writeToDB(users) {
  console.log(users);
}
