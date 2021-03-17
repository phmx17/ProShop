import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {  // accessing dynamic URL segment; can contain multiple params; /:id/:test/:test2 = match.params.test
  const [product, setProduct] = useState({});

  useEffect(() => { 
    const fetchProduct = async() => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);  // clever destructure
      setProduct(data); // replenish state
    }
    fetchProduct();
  }, [match]);

  return (
    <>
     <Link className="btn btn-light my-3" to="/">Go Back</Link>
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
             <ListGroupItem>
                <Button className="btn-block" type="button" disabled={product.countInStock === 0} >Add to Cart</Button>
             </ListGroupItem>
           </ListGroup>
         </Card>
       </Col>
     </Row>
    </>
  )
}
// <Image fluid /> prevents image from overflowing
//  <ListGroup variant="flush"> removes border
//  <ListGroup variant="flush"> button stretches across
export default ProductScreen