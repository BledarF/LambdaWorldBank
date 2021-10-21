import React, { useState } from "react";
import "./UserLogin.css";

function UserLogin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/sessions";

  async function handleSubmit(e) {
    e.preventDefault();
    if (props.submit) {
      props.submit(username, password);
    }
    const validationResult = await validate(username, password);
    if (validationResult) {
      setError(validationResult);
    } else {
      await getAccount(url, username, password);
    }
  }

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
    const { fetchActiveSession } = props;

    const body = {
      username: username,
      password: password,
    };
    //console.log(body);
    try {
      const getAccountResponse = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: body }),
      });

      const json = await getAccountResponse.json();

      if (!(json.error === "Valid.")) {
        setError("Invalid Username/password");
      } else {
        setError("");
        fetchActiveSession();
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
