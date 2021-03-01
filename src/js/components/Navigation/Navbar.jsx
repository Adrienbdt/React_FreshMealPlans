import React from "react";
import { Nav, Navbar } from "react-bootstrap"

export default function FoodNavbar(props) {
  return (
    <Navbar>
        <Navbar.Brand href="#home">{props.title}</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
  </Navbar>
  );
}