import React, { useState } from "react";

function History() {
  const [history, setHistory] = useState();

  async function getHistory() {
    const url = "http://localhost:7000/api/searches/history";
    const addResponse = await fetch(url);

    const jsonResponse = await addResponse.json();

    setHistory(jsonResponse.history); //history should be returned as an object returning search
    //title search time/date? etc.
  }
  const { countrySelected, indicatorSelected, startYear, endYear } = history;

  return (
    <div>
      <h3>{countrySelected}</h3>
      <p>{indicatorSelected}</p>
      <p>{startYear}</p>
      <p>{endYear}</p>
    </div>
  );
}

export default History;
