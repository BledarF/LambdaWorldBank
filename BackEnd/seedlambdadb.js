// seedlambdadb.js

// Require sqlite
const sqlite3 = require("sqlite3");

// Import lambdadb
const db = new sqlite3.Database("./lambdaDb.sqlite");

// Fill tables with seed data (DOESN'T FILL AUTO-INCREMENT COLUMNS)
db.serialize(() => {
  db.run(`    
    INSERT INTO "users" ("username", "password", "salt", "created_at", "updated_at") 
    VALUES ('nathanj, 'unhashed1', 'salt1234', '2021-10-13 16:20:00', '2021-10-14 19:20:00'),
           ('kobiv, 'unhashed2', 'salt5678', '2021-10-15 09:45:00', '2021-10-16 10:36:00'),
           ('bledarf, 'unhashed3', 'salt9101', '2021-10-17 13:14:00', '2021-10-18 15:33:00');
           `);
  db.run(`
  INSERT INTO "admin" ("user_id") 
  VALUES (1);
  `);
  db.run(`  
  INSERT INTO "sessions" ("uuid, user_id, created_at")
  VALUES ('abcdefg', 1, '2021-10-14 23:45:00'),
         ('hijklmnop', 2, '2021-10-17 12:45:00'),
         ('qrstuv', 3, '2021-10-17 18:45:00');
         `);
  db.run(`
  INSERT INTO "searches" ("user_id, country_id, metric_id, start_year, end_year, searched_at")
  VALUES (1, 2, 3, 1999, 2002, '2021-10-18 12:51:00');
  `);
});
