import React, { useState, useEffect } from "react";

function History() {
  const [history, setHistory] = useState("");

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

  return <div></div>;
}

export default History;
