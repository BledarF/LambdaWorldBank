import "./App.css";
import UserRegistration from "./Components/UserRegistration";
import UserLogin from "./Components/UserLogin";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WORLD BANK PROJECT</h1>
        <UserLogin />
        <UserRegistration />
      </header>
    </div>
  );
}

export default App;
