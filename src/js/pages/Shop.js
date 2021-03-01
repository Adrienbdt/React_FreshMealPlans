import React, { useState } from "react";
import { getProducts } from "../api";
import {
  Container,
  Badge,
  Card,
  ListGroup,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import htmlParse from "html-react-parser";
import Navbar from "../components/Navigation/Navbar";

export default function Shop() {
  // payload stores all our products
  const payload = getProducts();

  // useState - default state : products are an empty array || state change all the products of the payload will populate the array --> setProducts() from loadProducts
  const [products, setProducts] = useState([]);

  // useState - default renders the shoppingCard which is an object containing an empty products {} and a totalPrice {} of 0 || state change --> setShoppingCart() kicks in
  const [shoppingCart, setShoppingCart] = useState({
    products: {},
    totalPrice: 0.0,
  });

  const loadProducts = function (event) {
    setProducts(payload.products);
  };

  // const loadProducts = (event) => {
  //   setProducts(payload.products);
  // }

  // our shoppingCart STATE will change through setShoppingCart() :
  // previous state is currentShoppingCart
  // newProducts is gonna store the object
  const addToShoppingCart = (product) => {
    setShoppingCart((currentShoppingCart) => {
      const newProducts = { ...currentShoppingCart.products };
      newProducts[product.id] = {
        product: product,
        quantity: newProducts[product.id]
          ? newProducts[product.id].quantity + 1
          : 1,
      };
      const newTotalPrice =
        currentShoppingCart.totalPrice + parseFloat(product.variants[0].price);

      return {
        products: newProducts,
        totalPrice: newTotalPrice,
      };
    });
  };

  const shoppingCartElements = [];
  for (const productId in shoppingCart.products) {
    shoppingCartElements.push(
      <ListGroup.Item>
        <Row>
          <Col lg={6}>{shoppingCart.products[productId].product.title}</Col>
          <Col lg={1}>
            <Button variant="primary" size="sm">
              -
            </Button>
          </Col>
          <Col lg={1}>
            <Badge variant="primary" pill>
              {shoppingCart.products[productId].quantity}
            </Badge>
          </Col>
          <Col lg={1}>
            <Button variant="primary" size="sm">
              +
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  }

  // const shoppingCartElements = shoppingCart.map((product, idx) => (
  //   <ListGroup.Item>{product.title}</ListGroup.Item>
  // ))

  // RENDERING ALL THE PRODUCTS OF OUR PAYLOAD ON CLICK
  const productElements = products.map((product, idx) => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.image.src} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{htmlParse(product.body_html)}</Card.Text>
        <Button
          onClick={(event) => addToShoppingCart(product)}
          variant="primary"
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  ));

  return (
    <Container>
      <Navbar title="Shop" />

      <Card style={{ width: "18rem" }}>
        <Card.Header>Shopping Cart</Card.Header>
        <ListGroup variant="flush">
          {shoppingCartElements}
          <ListGroup.Item>${shoppingCart.totalPrice}</ListGroup.Item>
        </ListGroup>
      </Card>

      <Button onClick={loadProducts}>Get Products</Button>
      {productElements}
    </Container>
  );
}
