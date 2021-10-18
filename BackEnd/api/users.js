// /api/users.js

const express = require("express");
const usersRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./lambdadb.sqlite");

module.exports = usersRouter;
