import "./App.css";

import React, { useEffect, useState } from "react";
import UserLogin from "./Components/UserLogin/UserLogin.js";
import UserRegistration from "./Components/UserRegistration/UserRegistration.js";
import SearchData from "./Components/SearchData/SearchData.js";
import Chart from "./Components/Chart/TestChart";
import Nav from "./Components/Nav/Nav.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

function App() {
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    fetchActiveSession();
  });

  async function fetchActiveSession() {
    const fetchActiveSessionUrl = `http://localhost:7000/api/sessions`;
    const response = await fetch(fetchActiveSessionUrl, {
      credentials: "include",
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
    if (jsonResponse.success) {
      setLogin(true);
      // const username = jsonResponse.sessions[0].email.split("@")[0];
    } else {
      setLogin(false);
    }
  }

  return (
    <Router>
      {/* <Header /> */}
      <div className="App">
        {loggedIn ? <Nav loggedIn={loggedIn} /> : null}
        <main className="App-header">
          <Switch>
            <Route exact path="/home">
              {!loggedIn ? (
                <Redirect to="/" />
              ) : (
                <SearchData
                  fetchActiveSession={fetchActiveSession}
                  loggedIn={loggedIn}
                />
              )}
            </Route>
            <Route exact path="/">
              {loggedIn ? (
                <Redirect to="/home" />
              ) : (
                <div>
                  <UserLogin
                    loggedIn={loggedIn}
                    fetchActiveSession={fetchActiveSession}
                  />
                  <UserRegistration />
                </div>
              )}
            </Route>
            <Route path="/chart">
              <Chart />
            </Route>
            <Route exact path="/">
              <UserLogin />
              <UserRegistration />
            </Route>
          </Switch>
        </main>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
