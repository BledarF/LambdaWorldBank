const express = require("express");
const searchesRouter = express.Router();
const sqlite3 = require("sqlite3");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Pool, Client } = require("pg");

const connectionString =
  "postgres://czreijar:TJ2StTuQIl2CoRoinQTwPxk8pBGfdf6t@kandula.db.elephantsql.com/czreijar";
const pool = new Pool({
  connectionString,
});
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log(err);
  }
  pool.end();
});
const client = new Client({
  connectionString,
});
client.connect();
client.query(
  "SELECT indicatorname FROM indicators WHERE countrycode = 'ALB' LIMIT 1",
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      const country = res.rows;
      console.log(country);
    }
    client.end();
  }
);
