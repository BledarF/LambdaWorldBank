// /api/searches.js

const express = require("express");
const searchesRouter = express.Router();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./lambdadb.sqlite");

module.exports = searchesRouter;
