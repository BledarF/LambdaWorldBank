// /database/teststatements.js

/* IGNORE ME

WITH a AS (
	SELECT LongName, ShortName, CountryCode cc, Region, IncomeGroup
	FROM  Country
	WHERE Countrycode = 'GBR'
), b AS (
	SELECT Countrycode cc, Seriescode sc, Description cndesc
	FROM CountryNotes
	WHERE Countrycode = 'GBR'
), c AS (
	SELECT Countrycode cc, Seriescode sc, Year, Description fndesc
	FROM Footnotes
	WHERE Countrycode = 'GBR'
), d AS (
	SELECT CountryCode cc, IndicatorName, IndicatorCode, Year, AVG(Value) OVER (PARTITION BY Year) AS avg_value
	FROM Indicators
	WHERE Countrycode = 'GBR'
		AND IndicatorName = 'Electricity production from coal sources (% of total)'
		AND Year BETWEEN 1960 AND 2000
), e AS (
	SELECT SeriesCode sc, IndicatorName, Source
	FROM Series
), f AS (
	SELECT Seriescode sc, Year, Description
	FROM SeriesNotes
)

SELECT  a.LongName, a.ShortName, a.cc, a.Region, a.IncomeGroup, d.IndicatorName, d.Year, d.avg_value
FROM a
LEFT JOIN b
	ON a.cc = b.cc
LEFT JOIN c
	ON b.sc = c.sc
LEFT JOIN d
	ON a.cc = d.cc
LEFT JOIN e 
	ON c.sc = e.sc
LEFT JOIN f
	ON c.sc = f.sc
GROUP BY d.Year -- if you remove this you see the value for each sc
ORDER BY d.Year

*/

/*

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

*/
