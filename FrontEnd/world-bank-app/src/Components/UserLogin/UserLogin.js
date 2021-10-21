import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import "./UserLogin.css";

function UserLogin(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const url = "http://localhost:7000/api/sessions";

  async function handleSubmit(e) {
    e.preventDefault();
    const { username, password } = values;
    console.log(username, password);
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
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder="Example@email.com"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
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
        </Row>

        <Button variant="secondary" type="submit">
          Login
        </Button>
        {<p id="error-msg">{error}</p>}
      </Form>
    </Container>
  );
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

export default UserLogin;
