import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Edit.css'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Edit() {
    const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    id: '',
    ProductName: '', // Use 'ProductName' here
    categoryId: '',
    description: '',
    price: 0,
    isAvailable: false,
    productImage: '',
    rating: '',
    review: '',
    vendorName: '',
    warranty: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/seller/viewProduct/${productId}`);
        console.log(response);
        const product = response.data.product;
        setProductData(product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:5000/api/seller/edit/${productId}`, productData);
      console.log('Update response:', response.data);
  
      // Add any additional logic or navigation after successful update
      // Example: Navigate to the product details page
      navigate(`/sellerdashboard`);
    } catch (error) {
      console.error('Error updating product:', error);
  
      // Log the specific error message
      if (error.response) {
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
      } else {
        console.error('General error:', error.message);
      }
    }
  };
  
  return (
    <Container >
      <Row className="justify-content-center" style={{ maxHeight: '800px', overflowY: 'auto' }}>
<Col xs={12} md={8} lg={6}>

<div>
        <h2 className='mt-3'>Edit Product</h2>
        <Form className="p-5 container text-center card">
          <Form.Group className="mb-3" controlId="ProductName">
            <Form.Label>
              <h5>Product Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={ProductData.ProductName}
              onChange={handleInputChange}
              name="ProductName"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="categoryId">
            <Form.Label>
              <h5>Category ID</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Category ID"
              value={productData.categoryId}
              onChange={handleInputChange}
              name="categoryId"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="price"
              value={productData.description}
              onChange={handleInputChange}
              name="price"
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='price' >
            <Form.Label>
              <h5>Description</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="price"
              value={productData.price}
              
              onChange={handleInputChange}
              name="price"
            />
          </Form.Group>
                <Form.Group controlId="isAvailable">
        <Form.Label>Is Available:</Form.Label>
        <Form.Control as="select" name="isAvailable" value={productData.isAvailable} onChange={handleInputChange}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="productImage">
        <Form.Label>Product Image URL:</Form.Label>
        <Form.Control type="text" name="productImage" value={productData.productImage} onChange={handleInputChange} />
      </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating:</Form.Label>
            <Form.Control type="text" name="rating" value={productData.rating} onChange={handleInputChange} />
          </Form.Group>
      

          <Form.Group controlId="review">
            <Form.Label>Review:</Form.Label>
            <Form.Control type="text" name="review" value={productData.review} onChange={handleInputChange} />
          </Form.Group>
 

          <Form.Group controlId="vendorName">
            <Form.Label>Vendor Name:</Form.Label>
            <Form.Control type="text" name="vendorName" value={productData.vendorName} onChange={handleInputChange} />
            </Form.Group>

          <Form.Group controlId="warranty">
            <Form.Label>Warranty:</Form.Label>
            <Form.Control type="text" name="warranty" value={productData.warranty} onChange={handleInputChange} />
          </Form.Group>

          <Button
            onClick={(e) => handleUpdate(e)}
            style={{ textAlign: 'center' }}
            className="mt-3"
            variant="primary"
          >
            Update
          </Button>
        </Form>
      </div>
</Col>
</Row>
      
    </Container>
  );
}



export default Edit;