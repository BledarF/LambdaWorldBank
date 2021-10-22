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

// Get all countries
searchesRouter.get("/countries", async (req, res, next) => {
  const client = await pool.connect();
  const sql = `
    SELECT DISTINCT shortname
    FROM countries
    ORDER BY shortname;
  `;
  client.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const countries = result.rows.map((country) => {
        return country.shortname;
      });
      res.status(200).send({ countries: countries });
    }
  });
});

// Get indicators for chosen country
searchesRouter.get("/indicators", async (req, res, next) => {
  const client = await pool.connect();
  const sql = `
    SELECT DISTINCT indicators.indicatorname
    FROM indicators 
    ORDER BY indicators.indicatorname
    LIMIT 100
  `;

  client.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      const indicatorsForCountry = result.rows.map((indics) => {
        return indics.indicatorname;
      });
      res.status(200).send({ indicatorsForCountry: indicatorsForCountry });
    }
  });
});

// Post user search
searchesRouter.post("/", async (req, res, next) => {
  // Search body params
  const { ShortName, IndicatorName, StartYear, EndYear } = req.body.search;

  if (!ShortName || !IndicatorName || !StartYear || !EndYear) {
    return res.sendStatus(400);
  }
  const client = await pool.connect();

  const values = [ShortName, IndicatorName, StartYear, EndYear];

  const sql = `
    SELECT countries.shortname, indicators.indicatorname, indicators.year, indicators.value
    FROM countries 
    JOIN indicators
      ON countries.countrycode = indicators.countrycode
    WHERE countries.shortname = $1
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
        ShortName,
        StartYear,
        EndYear,
        result.rows
      );
      res.status(201).send({ data: data });
    }
  });
});

module.exports = searchesRouter;

function sendData(IndicatorName, ShortName, StartYear, EndYear, result) {
  console.log(result);
  const title = `${IndicatorName} for ${ShortName} from ${StartYear} to ${EndYear}`;
  const xaxis = "Year";
  const yaxis = `${IndicatorName}`;
  const xrange = result.map((row) => {
    return row.year;
  });
  const yrange = result.map((row) => {
    return row.value;
  });
  const data = {
    country: ShortName,
    title: title,
    xaxis: xaxis,
    yaxis: yaxis,
    xrange: xrange,
    yrange: yrange,
  };

  return data;
}
