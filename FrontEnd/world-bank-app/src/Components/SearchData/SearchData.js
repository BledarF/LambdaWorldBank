import React, { useState, useEffect } from "react";
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
  const [selectCountry, setCountry] = useState();
  const [selectIndicator, setIndicator] = useState();
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);
  const [graphData, setData] = useState();
  const [allCountries, setAllCountries] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const { fetchActiveSession, loggedIn } = props;

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    await getCountries();
    await getIndicators();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const submitSearchUrl = `http://localhost:7000/api/searches`;
    const response = await searchInfo(
      submitSearchUrl,
      selectCountry,
      selectIndicator,
      startYear,
      endYear
    );

    const jsonResponse = await response.json();
    setData(jsonResponse);
  }

  async function searchInfo(
    url,
    countrySelected,
    indicatorSelected,
    startYear,
    endYear
  ) {
    const body = {
      ShortName: countrySelected,
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

    setAllIndicators(jsonResponse);
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
                title={!selectCountry ? "Select Country" : selectCountry}
              >
                {allCountries.map((country) => (
                  <Dropdown.Item onClick={() => setCountry(country)}>
                    {country}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Indicators</Form.Label>
                <Form.Control
                  value={selectIndicator}
                  onChange={(e) => setIndicator(e.target.value)}
                  name="indicatorName"
                  required
                />
              </Form.Group>
            </Col>
            <Col md>
              <Form.Group>
                <Form.Label>Year Range</Form.Label>
                <Form.Control
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  name="startYear"
                  required
                />
                <Form.Control
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  name="endYear"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">Search</Button>

          {/* {<p id="error-msg">{error}</p>} */}
        </Form>
        {graphData ? <Chart graphData={graphData} /> : ""}
      </Container>
    </div>
  );
}

export default SearchData;
