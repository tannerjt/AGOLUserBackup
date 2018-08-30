// UserRepository.js
// write users to

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      fullName TEXT,
      email TEXT,
      availableCredits REAL,
      assignedCredits REAL,
      lastLogin INTEGER,
      disabled TEXT,
      created INTEGER,
      access TEXT,
      role TEXT
    )
    `;
    return this.dao.run(sql);
  }

  dropTable() {
    const sql = `
      IF EXISTS(SELECT * FROM users)
        DROP TABLE users
    `;
    return this.dao.run(sql);
  }

  create(user) {
    return this.dao.run(
      `INSERT INTO users
       (username, fullName, email, availableCredits, assignedCredits
       lastLogin, disabled, created, access, role)
       VALUES
       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [user.username, user.fullName, user.email, user.availableCredits,
      user.assignedCredits, user.lastLogin, user.created, user.access,
      user.role]
    );
  }
}
