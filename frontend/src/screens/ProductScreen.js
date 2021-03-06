import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({ history, match }) => {  // accessing dynamic URL segment; can contain multiple params; /:id/:test/:test2 = match.params.test
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  useEffect(() => { 
   dispatch(listProductDetails(match.params.id))
  }   
  , [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  return (
    <>
     <Link className="btn btn-light my-3" to="/">Go Back</Link>
     { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
       <Row>
         <Col md={6}>
           <Image src={product.image} alt={product.name} fluid />
         </Col>
         <Col md={3}>
           <ListGroup variant="flush">
             <ListGroup.Item>
               <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
               <Rating value={product.rating} text={`${product.numReviews}reviews`} />
             </ListGroup.Item>
             <ListGroup.Item>
               Price: ${product.price}             
             </ListGroup.Item>
             <ListGroup.Item>
               Description: ${product.description}             
             </ListGroup.Item>
           </ListGroup>
         </Col>
         <Col md={3}>
           <Card>
             <ListGroup variant="flush">
               <ListGroupItem>
                 <Row>
                   <Col>Price:</Col>
                   <Col><strong>${product.price}</strong></Col>
                 </Row>
               </ListGroupItem>
               <ListGroupItem>
                 <Row>
                   <Col>Status</Col>
                   <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                 </Row>
               </ListGroupItem>
               { product.countInStock > 0 && (
                 <ListGroup.Item>
                   <Row>
                     <Col>Qty</Col>
                     <Col>
                      <Form.Control as="select" value={qty} onChange={ (e) => setQty(e.target.value)}>
                        {
                          [...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))
                        }
                      </Form.Control>
                     </Col>
                   </Row>
                 </ListGroup.Item>
               )}
               <ListGroupItem>
                  <Button 
                    onClick={addToCartHandler}
                    className="btn-block" 
                    type="button" 
                    disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
               </ListGroupItem>
             </ListGroup>
           </Card>
         </Col>
       </Row>
     )}
    </>
  )
}
// <Image fluid /> prevents image from overflowing
//  <ListGroup variant="flush"> removes border
//  <ListGroup variant="flush"> button stretches across
export default ProductScreen
