import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./UserRegistration.css";

function UserRegistration() {
  const [values, setValues] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/users";

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password, passwordConfirmation } = values;
    console.log(username, password, passwordConfirmation);

    const validationResult = validate(username, password, passwordConfirmation);
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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md>
            <Form.Group controlId="formEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@email.com"
                value={values.username}
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="passwordConfirmation"
                value={values.passwordConfirmation}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="secondary" type="submit">
          Register
        </Button>
        {<p id="error-msg">{error}</p>}
      </Form>
    </Container>
  );
}

function validate(username, password, passwordConfirmation) {
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
