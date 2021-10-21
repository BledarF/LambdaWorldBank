// /api/sessions.js

const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const cookie = require("cookie-parser");

const sqlite3 = require("sqlite3");

const sessionsRouter = express.Router();
sessionsRouter.use(cookie());
const lambdaDb = new sqlite3.Database("./database/lambdaDb.db");

async function generateSessionCookie(user_id) {
  const sessionId = uuidv4();
  const insertSessionIdQuery =
    "INSERT INTO sessions (uuid, user_id, created_at) VALUES ($uuid, $user_id , datetime('now'))";
  const values = {
    $uuid: sessionId,
    $user_id: user_id,
  };

  return { sessionId, insertSessionIdQuery, values };
}

// Retrieve login session

sessionsRouter.get("/", async (req, res) => {
  const sessionId = req.cookies.sessionId;
  const getUserFromSessionIdQuery =
    "SELECT username FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.uuid = $sessionId";
  const values = { $sessionId: sessionId };

  lambdaDb.get(getUserFromSessionIdQuery, values, (error, result) => {
    if (result !== undefined) {
      res.status(200).send({ username: result.username, success: true });
    } else {
      res.status(400).send({ success: false });
    }
  });
});

// Post user login
sessionsRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body.user;

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const sql = `SELECT password,id FROM users WHERE username = $username`;
  const values = {
    $username: username,
  };

  lambdaDb.get(sql, values, async (error, result) => {
    if (result === undefined) {
      return res.status(400).send({ error: "Incorrect username or password." });
    }
    const hashedPassword = result.password;
    const authenticatePassword = await bcrypt.compare(password, hashedPassword);

    if (authenticatePassword) {
      const { insertSessionIdQuery, values, sessionId } =
        await generateSessionCookie(result.id);

      lambdaDb.get(insertSessionIdQuery, values, (error, session) => {
        if (error) {
          res.status(500).send({ error: error });
        } else {
          res.cookie("sessionId", sessionId);
          res.status(201).send({ error: "Valid." });
        }
      });
    } else {
      res.status(500).send({ error: "Server error." });
    }
  });
});

sessionsRouter.delete("/", async (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  const deleteSessionQuery = "DELETE FROM sessions WHERE uuid = $uuid ";
  const values = { $uuid: sessionId };

  lambdaDb.run(deleteSessionQuery, values, (error, deletedSessionRow) => {
    if (error) {
      res.status(500).send({ status: false });
    } else {
      res.status(201).send({ status: true });
    }
  });
});

module.exports = sessionsRouter;
