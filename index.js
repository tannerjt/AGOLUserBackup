// AGOLUserBackup
var getToken = require('./lib/getToken.js');
var storeUsers = require('./lib/storeUsers.js');
require('dotenv').load();

getToken(process.env.USERNAME, process.env.PASSWORD)
.then((resp) => {
  storeUsers(resp.token).then((resp) => {
    console.log('completed!')
  })
}, console.log);
