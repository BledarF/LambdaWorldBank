import React, { useState } from "react";
import "./UserLogin.css";

function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/sessions";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = await validate(username, password);
    if (validationResult) {
      setError(validationResult);
    } else {
      const getAccountResponse = await getAccount(url, username, password);
      console.log(getAccountResponse);

      // setError(createAccountResponse);
    }
  };

  async function validate(username, password) {
    if (!username) {
      return "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      return "Email address is invalid";
    } else if (!password) {
      return "Password is required";
    } else if (password.length < 9) {
      return "Password does not exceed 8 characters. Please try again.";
    } else {
      return false;
    }
  }

  async function getAccount(url, username, password) {
    const body = {
      username: username,
      password: password,
    };
    //console.log(body);
    try {
      const getAccountResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: body }),
      });

      const json = await getAccountResponse.json();
      console.log(json.error);

      if (!(json.error === "Valid.")) {
        setError("Invalid Username/password");
      } else {
        setError("");
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <form className="log-in-form" onSubmit={handleSubmit}>
      <label>
        {" "}
        Username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="email"
          name="username"
          required
        />
      </label>
      <label>
        {" "}
        Password:
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
        />
      </label>
      <button type="submit">Login</button>
      {<p id="error-msg">{error}</p>}
    </form>
  );
}

export default UserLogin;
