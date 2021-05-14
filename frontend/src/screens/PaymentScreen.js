import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux' 
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod} from '../actions/cartActions'


const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  if(!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

const submitHandler = (e) => {
  e.preventDefault()
  dispatch(savePaymentMethod( paymentMethod))
  history.push('/placeorder')
}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}> 
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check 
              type="radio" 
              label="Paypal or Credit Card" 
              id="PayPal" 
              name="paymentMethod" 
              value="PayPal" 
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check 
              type="radio" 
              label="Google Pay" 
              id="Google Pay" 
              name="paymentMethod" 
              value="GooglePay" 
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check 
              type="radio" 
              label="Free" 
              id="Free" 
              name="paymentMethod" 
              value="Free" 
              onChange={e => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>        
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
