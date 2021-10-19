import React, { useState } from "react";
import "./UserRegistration.css";

function UserRegistration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/users";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResult = await validate(
      username,
      password,
      passwordConfirmation
    );
    if (validationResult) {
      setError(validationResult);
    } else {
      const createAccountResponse = await createAccount(
        url,
        username,
        password,
        passwordConfirmation
      );
      console.log(createAccountResponse);

      // setError(createAccountResponse);
    }
  };

  async function validate(username, password, passwordConfirmation) {
    if (!username) {
      return "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      return "Email address is invalid";
    } else if (!password) {
      return "Password is required";
    } else if (password.length < 9) {
      return "Password does not exceed 8 characters. Please try again.";
    } else if (password !== passwordConfirmation) {
      return "Password does not match";
    } else {
      return false;
    }
  }

  async function createAccount(url, username, password) {
    const body = {
      username: username,
      password: password,
    };
    try {
      const createAccountResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await createAccountResponse.json();
      console.log(json);

      if (!json.msg) {
        return "That username is taken. Try another.";
      } else {
        return "";
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
      <label>
        {" "}
        Confirm Password:
        <input
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          type="password"
          name="passwordConfirmation"
          required
        />
      </label>
      <button type="submit">Register</button>
      {<p id="error-msg">{error}</p>}
    </form>
  );
}

export default UserRegistration;
