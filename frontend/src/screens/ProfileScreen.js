import React, { useState, useEffect} from 'react'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'


const ProfileScreen = ({ location, history }) => { // don't forget these for redirect !
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)  // for password not matching

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails) // get from store
  const { loading, error, user } = userDetails  // destructure

  const userLogin = useSelector(state => state.userLogin) // get from store
  const { userInfo } = userLogin  // destructure

  const userUpdateProfile= useSelector(state => state.userUpdateProfile) // get from store
  const { success } = userUpdateProfile // destructure

  // redirect if there is no user in the redux store
  useEffect(() => {
    if(!userInfo) {
      history.push('/login') 
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile')) // action will hit: '/api/users/profile' instead of a user id
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !==confirmPassword) { // check if passwords match
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return <Row>
    <Col md={3}>
      <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter name" 
              value={name} 
              onChange={e => setName(e.target.value)}>
            </Form.Control>
          </Form.Group>
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
          <Form.Group controlId="confirmPassword"> 
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={e => setConfirmPassword(e.target.value)}>
            </Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">Update</Button>
        </Form>
      </Col>
    <Col md={9}>
      <h2>My Orders</h2>
    </Col>
  </Row>

  


  
}
export default ProfileScreen
