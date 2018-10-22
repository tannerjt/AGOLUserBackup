// dao.js
// data access object

var sqlite3 = require('sqlite3');

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if(err) {
        console.log('Could not connect to database');
      } else {
        console.log('Connected to database');
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      })
    })
  }
}

module.exports = AppDAO;
