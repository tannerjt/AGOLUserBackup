// AGOLUserBackup
var getToken = require('../lib/getToken.js');
var getLicenses = require('../lib/getLicenses');
require('dotenv').load();

getToken(process.env.USERNAME, process.env.PASSWORD)
.then((resp) => {
  var token = resp.token;
  getLicenses(token, 'joshua.oregon').then((resp) => {
    console.log(resp);
  }, console.log)
}, console.log);
