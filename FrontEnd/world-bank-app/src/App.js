import "./App.css";
import UserRegistration from "./Components/UserRegistration";
import UserLogIn from "./Components/UserLogIn";

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
