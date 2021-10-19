import React, { useState } from "react";

function SearchData() {
  const [selectedCountries, setCountry] = useState([]);
  const [selectedIndicators, setIndicator] = useState([]);
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedCountries);
    console.log(startYear);
    console.log(endYear);

    const submitSearchUrl = `http://localhost:8080/add`;
    const response = await searchInfo(
      submitSearchUrl,
      selectedCountries,
      selectedIndicators,
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

  //   function addCountry(selectedCountries) {
  //     setCountry((prevState) => [...prevState, e.target.value]);

  //     return (
  //       <input
  //         value={selectedCountries}
  //         onChange={(e) =>
  //           setCountry((prevState) => [...prevState, e.target.value])
  //         }
  //         name="countryName"
  //         required
  //       />
  //     );
  //   }

  return (
    <div>
      {/* <NavBar /> */}
      <form className="SearchDataContainer" onSubmit={handleSubmit}>
        <label>
          {" "}
          Countries
          <input
            value={selectedCountries}
            onChange={(e) => setCountry(e.target.value)}
            name="countryName"
            required
          />
        </label>
        {/* <button onClick={}>+</button> */}
        <label>
          {" "}
          Indicators
          <input
            value={selectedIndicators}
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
