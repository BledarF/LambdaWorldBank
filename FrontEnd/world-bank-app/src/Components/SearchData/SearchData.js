import React, { useState, useEffect } from "react";
import "./SearchData.css";
import Logout from "../Logout/Logout.js";
import Chart from "../Chart/TestChart.js";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

function SearchData(props) {
  const [button2, setButton2] = useState();

  const [countries, setCountries] = useState([]);

  const [selectIndicator, setIndicator] = useState();
  const [startYear, setStartYear] = useState();
  const [endYear, setEndYear] = useState();
  const [graphData, setData] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [error, setError] = useState("");

  const { fetchActiveSession, loggedIn } = props;

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    await getCountries();
    await getIndicators();
    await getYears();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const submitSearchUrl = `http://localhost:7000/api/searches`;
    const response = await searchInfo(
      submitSearchUrl,
      countries,
      selectIndicator,
      startYear,
      endYear
    );

    const jsonResponse = await response.json();
    console.log(jsonResponse);

    if (endYear < startYear) {
      setError("Your end year must be greater than your start year!");
    } else if (jsonResponse.data.xrange.length === 0) {
      setError("Data does not exist. Please select a different indicator.");
    } else {
      setError("");
      setData(jsonResponse);
    }
  }

  async function searchInfo(
    url,
    countries,
    indicatorSelected,
    startYear,
    endYear
  ) {
    const body = {
      ShortName: countries,
      IndicatorName: indicatorSelected,
      StartYear: startYear,
      EndYear: endYear,
    };

    const addResponse = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: body }),
    });
    return addResponse;
  }

  async function getCountries() {
    const url = "http://localhost:7000/api/searches/countries";
    const addResponse = await fetch(url);

    const jsonResponse = await addResponse.json();

    setAllCountries(jsonResponse.countries);
  }

  async function getIndicators() {
    const url = "http://localhost:7000/api/searches/indicators";
    const addResponse = await fetch(url);

    const jsonResponse = await addResponse.json();

    console.log(jsonResponse);

    setAllIndicators(jsonResponse.indicatorsForCountry);
  }

  async function getYears() {
    const url = "http://localhost:7000/api/searches/years";
    const addResponse = await fetch(url);

    const jsonResponse = await addResponse.json();

    setAllYears(jsonResponse.years);
  }

  function handleClick(e) {
    setButton2(
      <Col md>
        <DropdownButton
          id="dropdown-basic-button"
          title={countries[1] ? "Select Country" : countries[1]}
        >
          {allCountries.map((country) => (
            <Dropdown.Item
              onClick={() => setCountries([...countries, country])}
            >
              {country}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Col>
    );
    console.log(countries);
  }

  return (
    <div>
      <Logout loggedIn={loggedIn} fetchActiveSession={fetchActiveSession} />
      {/* <NavBar /> */}
      <Container>
        <Form className="SearchDataContainer" onSubmit={handleSubmit}>
          <Row>
            <Col md>
              <DropdownButton
                id="dropdown-basic-button"
                title={!countries[0] ? "Select Country" : countries[0]}
              >
                {allCountries.map((country) => (
                  <Dropdown.Item
                    onClick={() => setCountries([...countries, country])}
                  >
                    {country}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <Button id="add" onClick={(e) => handleClick(e)}>
                {countries.length !== 2 ? "+" : countries[1]}
              </Button>
              {button2 ? button2 : null}
            </Col>
            <Col md>
              <Form.Group>
                <DropdownButton
                  className="indicatorMenu"
                  title={
                    !selectIndicator ? "Select Indicator" : selectIndicator
                  }
                >
                  <div className="dropdownMenu">
                    {allIndicators.map((indicator) => (
                      <Dropdown.Item onClick={() => setIndicator(indicator)}>
                        {indicator}
                      </Dropdown.Item>
                    ))}
                  </div>
                </DropdownButton>
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Year Range</Form.Label>
                <DropdownButton
                  id="dropdown-size-small"
                  title={!startYear ? "Select a start year!" : startYear}
                >
                  {allYears.map((year) => (
                    <Dropdown.Item size="sm" onClick={() => setStartYear(year)}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
                <DropdownButton
                  id="dropdown-size-small"
                  title={!endYear ? "Select a end year!" : endYear}
                >
                  {allYears.map((year) => (
                    <Dropdown.Item onClick={() => setEndYear(year)}>
                      {year}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">Search {console.log(countries)}</Button>
        </Form>
        {error === "" ? (
          graphData ? (
            <Chart graphData={graphData} />
          ) : (
            ""
          )
        ) : (
          <h2> {error} </h2>
        )}
        {/* {graphData.data.xrange.length !==0 ? <Chart graphData={graphData} /> : ""} */}
      </Container>
    </div>
  );
}

export default SearchData;
