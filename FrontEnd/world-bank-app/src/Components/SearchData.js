import React, { useState } from "react";

function SearchData() {
  const [selectCountry, setCountry] = useState();
  const [selectIndicator, setIndicator] = useState();
  const [allCountries, setCountries] = useState([
    { countryName: "", indicator: "" },
  ]);
  const [allIndicators, setIndicators] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const submitSearchUrl = `http://localhost:8080/add`;
    const response = await searchInfo(
      submitSearchUrl,
      allCountries,
      allIndicators,
      startYear,
      endYear
    );

    // const jsonResponse = await response.json();
  }

  async function searchInfo(
    url,
    countrySelected,
    indicatorSelected,
    startYear,
    endYear
  ) {
    const body = {
      countrySelected: countrySelected,
      indicatorSelected: indicatorSelected,
      startYear: startYear,
      endYear: endYear,
    };

    const addResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return addResponse;
  }

  function addCountry() {
    setCountries((prevState) => [...prevState, selectCountry]);
  }

  return (
    <div>
      {/* <NavBar /> */}
      <form className="SearchDataContainer" onSubmit={handleSubmit}>
        <label>
          {" "}
          Countries
          <input
            value={selectCountry}
            onChange={(e) => setCountry(e.target.value)}
            name="countryName"
            required
          />
        </label>
        <button onClick={addCountry}>+</button>
        <label>
          {" "}
          Indicators
          <input
            value={selectIndicator}
            onChange={(e) => setIndicator(e.target.value)}
            name="indicatorName"
            required
          />
        </label>
        <button>+</button>
        <label>
          {" "}
          Year Range
          <input
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            name="startYear"
            required
          />
          <input
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            name="endYear"
            required
          />
        </label>
        <button type="submit">Search</button>
        {/* {<p id="error-msg">{error}</p>} */}
      </form>
    </div>
  );
}

export default SearchData;
