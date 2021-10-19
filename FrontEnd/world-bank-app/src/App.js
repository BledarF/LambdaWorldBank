import logo from "./logo.svg";
import "./App.css";
import UserLogIn from "./Components/UserLogIn";
import UserRegistration from "./Components/UserRegistration";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WORLD BANK PROJECT</h1>
        <UserLogIn />
        <UserRegistration />
      </header>
    </div>
  );
}

export default App;
