import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import Logout from "../Logout/Logout.js";

function Navigation(props) {
  const { loggedIn, fetchActiveSession } = props;

  return (
    <Navbar bg="danger" vairant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/home">Team Lambda World Bank Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Search</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
          <Logout loggedIn={loggedIn} fetchActiveSession={fetchActiveSession} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
