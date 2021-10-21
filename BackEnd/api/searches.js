// /api/searches.js

const express = require("express");
const searchesRouter = express.Router();

const sqlite3 = require("sqlite3");
const lambdaDb = new sqlite3.Database("./database/bankdatabase.db"); // CHANGE ME TO HOSTED DB

// Post user search
searchesRouter.post("/", (req, res, next) => {
  // Search body params
  const { LongName, CountryCode, IndicatorName, StartYear, EndYear } =
    req.body.search;

  if (!LongName || !CountryCode || !IndicatorName || !StartYear || !EndYear) {
    return res.sendStatus(400);
  }

  const sql = `
WITH a AS (
	SELECT LongName, ShortName, CountryCode cc, Region, IncomeGroup
	FROM  Country
	WHERE LongName = $LongName
), d AS (
	SELECT CountryCode cc, IndicatorName, IndicatorCode, Year, AVG(Value) OVER (PARTITION BY Year) AS avg_value
	FROM Indicators
	WHERE cc = $CountryCode
		AND IndicatorName = $IndicatorName
		AND Year BETWEEN $StartYear AND $EndYear
)

SELECT  a.LongName, a.ShortName, a.cc, a.Region, a.IncomeGroup, d.IndicatorName, d.Year, d.avg_value
FROM a
LEFT JOIN d
	ON a.cc = d.cc
ORDER BY d.Year
`;

  const values = {
    $LongName: LongName,
    $CountryCode: CountryCode,
    $IndicatorName: IndicatorName,
    $StartYear: StartYear,
    $EndYear: EndYear,
  };

  lambdaDb.run(sql, values, (error, row) => {
    if (error) {
      res.status(400).send({ error: "Bad search" });
    } else {
      lambdaDb.all(sql, values, (error, rows) => {
        if (error) {
          console.log(error);
        } else {
          const title = `${IndicatorName} for ${LongName} from ${StartYear} to ${EndYear}`;
          const xaxis = "Year";
          const yaxis = `${IndicatorName}`;
          const xrange = rows.map((row) => {
            return row.Year;
          });
          const yrange = rows.map((row) => {
            return row.avg_value;
          });
          res.status(201).send({
            data: {
              title: title,
              xaxis: xaxis,
              yaxis: yaxis,
              xrange: xrange,
              yrange: yrange,
            },
          });
        }
      });
    }
  });
});

module.exports = searchesRouter;
