// /api/searches.js

const express = require("express");
const searchesRouter = express.Router();
const sqlite3 = require("sqlite3");
const lambdaDb = new sqlite3.Database("./database/lambdaDb.db");
const cookie = require("cookie-parser");
searchesRouter.use(cookie());

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
      client.release();
      res.sendStatus(500);
    } else {
      const countries = result.rows.map((country) => {
        return country.shortname;
      });
      client.release();
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
    ORDER BY indicators.indicatorname;
  `;

  client.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      client.release();
      res.sendStatus(500);
    } else {
      const indicatorsForCountry = result.rows.map((indics) => {
        return indics.indicatorname;
      });
      client.release();
      res.status(200).send({ indicatorsForCountry: indicatorsForCountry });
    }
  });
});

// Get all years
searchesRouter.get("/years", async (req, res, next) => {
  const client = await pool.connect();
  const sql = `
    SELECT DISTINCT year
    FROM indicators
    ORDER BY year;
  `;
  client.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      client.release();
      res.sendStatus(500);
    } else {
      const years = result.rows.map((year) => {
        return year.year;
      });
      client.release();
      res.status(200).send({ years: years });
    }
  });
});

// Get search history for particular user
searchesRouter.get("/history", async (req, res, next) => {
  const uuid = req.cookies.sessionId;
  const sql = "SELECT user_id FROM sessions WHERE uuid = $uuid";
  const val = { $uuid: uuid };
  lambdaDb.get(sql, val, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
      const { user_id } = row;
      const sql2 = `SELECT * FROM searches WHERE user_id = $user_id`;
      const val2 = { $user_id: user_id };
      lambdaDb.all(sql2, val2, (err, rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
          res.status(200).send({ rows: rows });
        }
      });
    }
  });
});

// Post user search
searchesRouter.post("/", async (req, res, next) => {
  // Search body params
  const { ShortName, IndicatorName, StartYear, EndYear } = req.body.search;
  const uuid = req.cookies.sessionId;

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
      const sql5 = "SELECT user_id FROM sessions WHERE uuid = $uuid";
      const val5 = { $uuid: uuid };
      lambdaDb.get(sql5, val5, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          const { user_id } = row;
          const currentDateAndTime = new Date();
          const sql2 = `
      INSERT INTO searches (country_id, metric_id, user_id, start_year, end_year, searched_at)
      VALUES ($country_id, $metric_id, $user_id, $start_year, $end_year, $searched_at)
      `;
          const values2 = {
            $country_id: ShortName,
            $metric_id: IndicatorName,
            $user_id: user_id,
            $start_year: StartYear,
            $end_year: EndYear,
            $searched_at: currentDateAndTime.toISOString(),
          };
          lambdaDb.run(sql2, values2, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });

      const data = sendData(
        IndicatorName,
        ShortName,
        StartYear,
        EndYear,
        result.rows
      );

      res.status(201).send({ data: data });
      client.release();
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
