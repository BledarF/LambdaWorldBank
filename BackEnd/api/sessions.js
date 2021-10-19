// /api/sessions.js

const express = require("express");
const sessionsRouter = express.Router();

const sqlite3 = require("sqlite3");
const lambdaDb = new sqlite3.Database("./database/lambdaDb.db");

// Post user login
sessionsRouter.post("/", (req, res, next) => {
  const username = req.body.user.username;
  const password = req.body.user.password;
  //   const salt = "changeme";
  //   const currentDateAndTime = new Date().toString();

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const sql = `SELECT COUNT(*) FROM users WHERE users.username = $username AND users.password = $password`;
  const values = {
    $username: username,
    $password: password,
  };

  lambdaDb.run(sql, values, function (error) {
    if (error) {
      // next(error)
      res.status(400).send({ error: "Incorrect username or password. " });
    } else {
      lambdaDb.get(sql, (error, count) => {
        res.status(201).json({ count: count });
      });
    }
  });
});

module.exports = sessionsRouter;
