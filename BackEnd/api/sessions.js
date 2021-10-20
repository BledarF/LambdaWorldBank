// /api/sessions.js

const express = require("express");
const sessionsRouter = express.Router();
const bcrypt = require("bcrypt");

const sqlite3 = require("sqlite3");
const lambdaDb = new sqlite3.Database("./database/lambdaDb.db");

// Post user login
sessionsRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body.user;
  console.log(username);
  //   const salt = "changeme";
  //   const currentDateAndTime = new Date().toString();

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const sql = `SELECT password FROM users WHERE username = $username`;
  const values = {
    $username: username,
  };

  lambdaDb.get(sql, values, async (error, result) => {
    const hashedPassword = result.password;
    const authenticatePassword = await bcrypt.compare(password, hashedPassword);
    if (!result.password) {
      // next(error)
      res.status(400).send({ error: "Incorrect username or password." });
    } else if (authenticatePassword) {
      res.status(201).send({ error: "Valid." });
    } else {
      res.status(500).send({ error: "Server error." });
    }
  });
});

module.exports = sessionsRouter;
