import React, { useState } from "react";
import "./UserRegistration.css";

function UserRegistration(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/users";

  async function handleSubmit(e) {
    e.preventDefault();
    // if (props.submit) {
    //   props.submit(username, password, passwordConfirmation);
    // }

    const { username, password, passwordConfirmation } = values;
    const validationResult = await validate(
      username,
      password,
      passwordConfirmation
    );
    if (validationResult) {
      setError(validationResult);
    } else {
      await createAccount(url, username, password);
    }
  }

  async function createAccount(url, username, password) {
    const body = {
      username: username,
      password: password,
    };
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    try {
      const createAccountResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: body }),
      });

      const json = await createAccountResponse.json();
      if (json.error === "Username already in use. ") {
        setError(json.error);
      } else {
        setError("Success! Account created.");
      }
    } catch (error) {
      return error;
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <form
      className="log-in-form"
      onSubmit={handleSubmit}
      data-testid="userRegistration-1"
    >
      <label>
        {" "}
        Username:
        <input
          value={values.username}
          onChange={handleChange}
          type="email"
          name="username"
          required
        />
      </label>
      <label>
        {" "}
        Password:
        <input
          value={values.password}
          onChange={handleChange}
          type="password"
          name="password"
          required
        />
      </label>
      <label>
        {" "}
        Confirm Password:
        <input
          value={values.passwordConfirmation}
          onChange={handleChange}
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

export default UserRegistration;
