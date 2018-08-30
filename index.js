// AGOLUserBackup
var getToken = require('./lib/getToken.js');
var getUsers = require('./lib/getUsers.js');
require('dotenv').load();

getToken(process.env.USERNAME, process.env.PASSWORD)
.then((resp) => {
  getUsers(resp.token).then((resp) => {
    console.log(resp.total);
  })
}, console.log);
