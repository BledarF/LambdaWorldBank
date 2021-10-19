import "./App.css";

import React from "react";
import UserLogin from "./Components/UserLogin.js";
import UserRegistration from "./Components/UserRegistration.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      <div className="App">
        <main className="App-header">
          <Switch>
            {/* <Route path="/home">
              <SearchData />
            </Route> */}
            <Route path="/login">
              <UserLogin />
            </Route>
            <Route path="/sign-up">
              <UserRegistration />
            </Route>
            <Route path="/">
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
