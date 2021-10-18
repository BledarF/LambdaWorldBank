// /api/sessions.js

const express = require("express");
const sessionsRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./lambdadb.sqlite");

module.exports = sessionsRouter;
