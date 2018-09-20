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
      role TEXT,
      tag_primary TEXT,
      tag_secondary TEXT
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
       (username, fullName, email, availableCredits, assignedCredits,
       disabled, lastLogin, created, access, role, tag_primary, tag_secondary)
       VALUES
       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [user.username, user.fullName, user.email, user.availableCredits,
      user.assignedCredits, user.disabled, user.lastLogin, user.created, user.access,
      user.role, user.tag_primary, user.tag_secondary]
    );
  }
}

module.exports = UserRepository;
