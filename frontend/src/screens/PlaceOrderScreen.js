import React, { useState } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
  const cart = useSelector(state => state.cart);  // collect cart from redux store
  
  // function to add zeroes for nicer display of costs
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // calculate cart items price
  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))  // start acc at zero
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10) // free shipping on orders over $100
  cart.taxPrice = addDecimals(Number((0.0825 * cart.itemsPrice).toFixed(2))) // must generate a Number type otherwise it's a string
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2);

  // placeOrder helper
  const placeOrderHandler = () => {
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 /> 
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>

            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

              <h2>Ordered Items</h2>
              {cart.items === 0 ? <Message>Your cart is empty</Message>
               : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                     <Row>
                       <Col md={1}>
                         <Image src={item.image} alt={item.name} fluid rounded />
                       </Col>
                       <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link> {/* product is the id */}
                       </Col>
                       <Col md={4}>
                        {item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}
                       </Col>
                     </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}          
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen;