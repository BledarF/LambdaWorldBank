// /api/admin.js

const express = require("express");
const adminRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./lambdadb.sqlite");

module.exports = adminRouter;
