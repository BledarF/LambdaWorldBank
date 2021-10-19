const sqlite3 = require("sqlite3");

const lambdaDb = new sqlite3.Database("./lambdaDb.db");

lambdaDb.serialize(() => {
  // lambdaDb.run("DROP TABLE IF EXISTS users,");

  lambdaDb.run(
    `CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  salt TEXT NO NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
)`
  );

  lambdaDb.run(
    `CREATE TABLE admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
   FOREIGN KEY (user_id) REFERENCES users(id)
  )`
  );

  lambdaDb.run(
    `CREATE TABLE sessions (
    uuid TEXT PRIMARY KEY,
    created_at DATETIME NOT NULL,
    user_id INTEGER
  )`
  );

  lambdaDb.run(`CREATE TABLE searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      country_id INTEGER,
      metric_id INTEGER,
      user_id INTEGER,
      start_year DATETIME NOT NULL,
      end_year DATETIME NOT NULL
    )`);
});
