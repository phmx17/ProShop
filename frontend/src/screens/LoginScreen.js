import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


const LoginScreen = ({ location, history }) => { // don't forget these for redirect !
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin) // get from store
  const { loading, error, userInfo } = userLogin  // destructure
  const redirect = location.search ? location.search.split('=')[1] : '/' // give alternative route

  // redirect if there already is a user in the redux store
  useEffect(() => {
    if(userInfo) {
      history.push(redirect) //  push redirect onto history
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">Sign In</Button>
      </Form>  
      <Row className="py-3">
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen
