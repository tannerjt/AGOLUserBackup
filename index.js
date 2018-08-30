// AGOLUserBackup
var getToken = require('./lib/getToken.js');
require('dotenv').load();

getToken(process.env.CLIENTID, process.env.CLIENTSECRET).then((resp) => {
  console.log(resp)
})
