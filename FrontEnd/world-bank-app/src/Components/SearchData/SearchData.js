import React, { useState } from "react";
import Logout from "../Logout/Logout.js";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

function SearchData(props) {
  const [selectCountry, setCountry] = useState();
  const [selectIndicator, setIndicator] = useState();
  const [startYear, setStartYear] = useState([]);
  const [endYear, setEndYear] = useState([]);

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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return addResponse;
  }

  const { fetchActiveSession, loggedIn } = props;

  return (
    <div>
      <Logout loggedIn={loggedIn} fetchActiveSession={fetchActiveSession} />
      {/* <NavBar /> */}
      <Container>
        <Form className="SearchDataContainer" onSubmit={handleSubmit}>
          <Row>
            <Col md>
              <Form.Group>
                <Form.Label>Countries</Form.Label>
                <Form.Control
                  value={selectCountry}
                  onChange={(e) => setCountry(e.target.value)}
                  name="countryName"
                  required
                />
              </Form.Group>
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
      </Container>
    </div>
  );
}

export default SearchData;
