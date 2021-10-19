// /api/users.js

const express = require("express");
const usersRouter = express.Router();

const sqlite3 = require("sqlite3");
const lambdaDb = new sqlite3.Database("./database/lambdaDb.db");

// Defining userId param
usersRouter.param("userId", (req, res, next, userId) => {
  const sql = "SELECT * FROM users WHERE id = $userId";
  const values = { $userId: userId };
  lambdaDb.get(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// Get all users
usersRouter.get("/", (req, res, next) => {
  lambdaDb.all("SELECT * FROM users;", (err, users) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ users: users });
    }
  });
});

// Get particular user
usersRouter.get("/:userId", (req, res, next) => {
  res.status(200).json({ user: req.user });
});

// Post a user
usersRouter.post("/", (req, res, next) => {
  console.log(req.body);
  const username = req.body.user.username;
  console.log(username);
  const password = req.body.user.password;
  const salt = "changeme";
  const currentDateAndTime = new Date().toString();

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const sql = `INSERT INTO users (username, password, salt, created_at, updated_at)
    VALUES ($username, $password, $salt, $created_at, $updated_at)`;
  const values = {
    $username: username,
    $password: password,
    $salt: salt,
    $created_at: currentDateAndTime,
    $updated_at: currentDateAndTime,
  };

  lambdaDb.run(sql, values, function (error) {
    if (error) {
      next(error);
    } else {
      lambdaDb.get(
        `SELECT * FROM users WHERE users.id = ${this.lastID}`,
        (error, user) => {
          res.status(201).json({ user: user });
        }
      );
    }
  });
});

// Update user (username, password, salt, updated_at)
usersRouter.put("/:userId", (req, res, next) => {
  const { username, password } = req.body;
  const salt = "changeme2";
  const currentDateAndTime = new Date().toString();
  if (!username || !password) {
    return res.sendStatus(400);
  }
  const sql =
    "UPDATE users SET username = $username, password = $password, salt = $salt, updated_at = $updated_at WHERE users.id = $userId";
  const values = {
    $username: username,
    $password: password,
    $salt: salt,
    $updated_at: currentDateAndTime,
    $userId: req.params.userId,
  };

  lambdaDb.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      lambdaDb.get(
        `SELECT * FROM users WHERE users.id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).json({ user: user });
        }
      );
    }
  });
});

// Delete a user
usersRouter.delete("/:userId", (req, res, next) => {
  const sql = "DELETE FROM users WHERE users.id = $userId";
  const values = { $userId: req.params.userId };

  lambdaDb.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(
        `SELECT * FROM users WHERE users.id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).send("User deleted. ");
        }
      );
    }
  });
});

module.exports = usersRouter;
