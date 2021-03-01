import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navbar from "../components/Navigation/Navbar";

export const Home = () => {

  let history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Hello");
    history.push("/order");
  }

  return (
    <Container>
      <Navbar
        title="MyShop"
      />
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>

            <Form.Group>
              <Form.Control placeholder="Enter Zip Code" />
            </Form.Group>

            <Form.Group>
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Get Started
            </Button>

          </Form>
        </Col>
        <Col>Col 2</Col>
      </Row>
    </Container>
  )
};
