import React, { useState } from "react";
import "./SearchData.css";

function SearchData() {
  const [selectCountry, setCountry] = useState();
  const [selectIndicator, setIndicator] = useState();
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const submitSearchUrl = `http://localhost:8080/add`;
    const response = await searchInfo(
      submitSearchUrl,
      selectCountry,
      selectIndicator,
      startYear,
      endYear
    );

    const jsonResponse = await response.json();

    console.log(jsonResponse);
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
