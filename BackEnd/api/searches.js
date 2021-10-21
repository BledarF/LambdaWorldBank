// /api/searches.js

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
  // pool.end();
});

// Post user search
searchesRouter.post("/", async (req, res, next) => {
  // Search body params
  const { LongName, IndicatorName, StartYear, EndYear } = req.body.search;

  if (!LongName || !IndicatorName || !StartYear || !EndYear) {
    return res.sendStatus(400);
  }
  const client = await pool.connect();

  const values = [LongName, IndicatorName, StartYear, EndYear];

  const sql = `
    SELECT countries.longname, indicators.indicatorname, indicators.year, indicators.value
    FROM countries 
    JOIN indicators
      ON countries.countrycode = indicators.countrycode
    WHERE countries.longname = $1
      AND indicators.indicatorname = $2
      AND indicators.year BETWEEN $3 AND $4
    ;`;

  client.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const data = sendData(
        IndicatorName,
        LongName,
        StartYear,
        EndYear,
        result.rows
      );
      res.status(201).send(data);
    }
  });
});

module.exports = searchesRouter;

function sendData(IndicatorName, LongName, StartYear, EndYear, result) {
  console.log(result);
  const title = `${IndicatorName} for ${LongName} from ${StartYear} to ${EndYear}`;
  const xaxis = "Year";
  const yaxis = `${IndicatorName}`;
  const xrange = result.map((row) => {
    return row.year;
  });
  const yrange = result.map((row) => {
    return row.value;
  });
  const data = {
    title: title,
    xaxis: xaxis,
    yaxis: yaxis,
    xrange: xrange,
    yrange: yrange,
  };

  return data;
}
