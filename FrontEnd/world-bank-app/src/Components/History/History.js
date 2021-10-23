import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav.js";
import "./History.css";

function History(props) {
  const { loggedIn, fetchActiveSession } = props;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    await getHistory();
  }

  async function getHistory() {
    const url = "http://localhost:7000/api/searches/history";
    const addResponse = await fetch(url, {
      credentials: "include",
    });

    const jsonResponse = await addResponse.json();
    console.log(jsonResponse);

    setHistory(jsonResponse); //history should be returned as an object returning search
    //title search time/date? etc.
  }

  // const { countrySelected, indicatorSelected, startYear, endYear } = history;

  return (
    <div>
      <Nav loggedIn={loggedIn} fetchActiveSession={fetchActiveSession} />
      {history.length !== 0 ? (
        history.rows.map((search) => {
          return (
            <div className="Record">
              <h2>Country: {search.country_id}</h2>
              <h2>Indicator: {search.metric_id}</h2>
              <h3>Start Year: {search.start_year}</h3>
              <h3>End Year: {search.end_year}</h3>
              <h4>Searched at: {search.searched_at}</h4>
            </div>
          );
        })
      ) : (
        <p>No searches exist</p>
      )}
    </div>
  );
}

export default History;
