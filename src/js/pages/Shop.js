import React, { useState } from "react";
import { getProducts } from "../api";
import {
  Container,
  Badge,
  Card,
  ListGroup,
  Row,
  Col,
  Grid,
  Form,
  Button,
} from "react-bootstrap";
import htmlParse from "html-react-parser";
import Navbar from "../components/Navigation/Navbar";

export default function Shop() {
  // payload stores all our products
  const payload = getProducts();
  // console.log(payload.products);

  // useState - default state : products are an empty array || state change all the products of the payload will populate the array --> setProducts() from loadProducts
  // const [products, setProducts] = useState([]);

  // useState - default renders the shoppingCard which is an object containing an empty products {} and a totalPrice {} of 0 || state change --> setShoppingCart() kicks in
  const [shoppingCart, setShoppingCart] = useState({
    products: {},
    totalPrice: 0.0,
  });

  /// ADRIEN

  // Display Total or not - by default should not be displayed
  const [totalShow, setTotalShow] = useState(false);

  const toggleTotal = () => {
    setTotalShow((prev) => true);
  };

  // Adding product +
  const addProductButton = document.querySelector("#addQty");
  // const [productAdd, setProductAdd] = useState({});

  // const addProduct = () => {
  //   setProductAdd((prev) => prev + 1);
  // };

  //Remove product -
  const removeProductButton = document.querySelector("#removeQty");

  /// ADRIEN END

  // const loadProducts = function (event) {
  //   setProducts(payload.products);
  // };

  // our shoppingCart STATE will change through setShoppingCart() :
  // previous state is currentShoppingCart
  // newProducts is gonna store the object
  const addToShoppingCart = (product) => {
    setShoppingCart((currentShoppingCart) => {
      // products{} assigned to local variable newProducts
      const newProducts = { ...currentShoppingCart.products };
      // newProducts contains all the properties of each product
      // the newProducts object will generate a new array, each new array object will be identified through its product id and contains an object with the following key values of this product
      newProducts[product.id] = {
        product: product, // product key - value all the properties of the targeted product object
        quantity: newProducts[product.id] // quantity key - value --- if this product.id is already part of our newProducts [] then add 1 to the quantity, else set 1
          ? newProducts[product.id].quantity + 1
          : 1,
      };

      /* ADRIEN */

      const myFunc = function () {
        console.log("hi");
      };

      /* END ADRIEN */

      // SHOPPING CART TOTAL CALCULATION
      const newTotalPrice =
        currentShoppingCart.totalPrice + parseFloat(product.variants[0].price);
      toggleTotal();

      return {
        products: newProducts, //OBJECT TO LOOP OVER
        totalPrice: newTotalPrice, // TOTAL PRICE TO DISPLAY
      };
    });
  };

  //////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////
  /* REPRESENTATION ELEMENTS ON COMPONENT */

  // REMOVING ELEMENT FROM SHOPPING CART
  // const removeElement = product;

  // SHOPPING CART ELEMENTS RENDERING
  const shoppingCartElements = [];
  for (const productId in shoppingCart.products) {
    shoppingCartElements.push(
      <Container>
        <Row>
          <Col
            lg={6}
            style={{
              display: "flex",
              fontSize: "0.8em",
            }}
          >
            {shoppingCart.products[productId].product.title}
          </Col>
          <Col lg={1}></Col>
          <Col lg={1} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              data-item={shoppingCart.products[productId].product.title}
              variant="primary"
              size="sm"
              id="removeQty"
            >
              -
            </Button>
          </Col>
          <Col lg={2} style={{ display: "flex", justifyContent: "center" }}>
            <Badge pill variant="light" style={{ width: "50%" }}>
              {shoppingCart.products[productId].quantity}
            </Badge>
          </Col>
          <Col lg={1} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              data-item={shoppingCart.products[productId].product.title}
              variant="primary"
              size="sm"
              id="addQty"
            >
              +
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={{ fontSize: "0.8em" }}>Remove</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  // const shoppingCartElements = shoppingCart.map((product, idx) => (
  //   <ListGroup.Item>{product.title}</ListGroup.Item>
  // ))

  // RENDERING ALL THE PRODUCTS THROUGH THE productElements variable
  const productElements = payload.products.map((product, idx) => (
    <Container
      style={{
        display: "flex",
        margin: "10px 0",
        width: "30%",
        justifyContent: "space-around",
      }}
    >
      <Row>
        <Col lg={12}>
          <Card style={{ height: "550px" }}>
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
        </Col>
      </Row>
    </Container>
  ));

  ///////////////////////////
  // SHOPPING SECTION COMPONENT
  /////////////////////////////
  return (
    <Container>
      <Row>
        <Col>
          <Navbar title="Shop" />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <Container
            style={{
              display: "flex",
            }}
          >
            <Col>
              <Row>{productElements}</Row>
            </Col>
          </Container>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Shopping Cart</Card.Header>
            {/* {shoppingCartElements}${shoppingCart.totalPrice} */}
            {shoppingCartElements}

            <span className={totalShow ? "total" : "hide"}>
              ${shoppingCart.totalPrice}
            </span>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
