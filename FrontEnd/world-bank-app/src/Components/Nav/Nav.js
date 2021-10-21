import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="light" vairant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Team Lambda World Bank Data</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/history">History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
