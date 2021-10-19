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

  const sql = `SELECT COUNT(*) count FROM users WHERE username = $username AND password = $password`;
  const values = {
    $username: username,
    $password: password,
  };

  lambdaDb.get(sql, values, (error, result) => {
    if (!result.count) {
      // next(error)
      res.status(400).send({ error: "Incorrect username or password." });
    } else if (result.count) {
      res.status(201).send({ error: "Valid." });
    } else {
      res.status(500).send({ error: "Server error." });
    }
  });
});

module.exports = sessionsRouter;
