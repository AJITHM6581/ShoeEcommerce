import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Edit.css';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Edit() {
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    id: '',
    ProductName: '',
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
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/seller/viewproduct/${productId}`);
        console.log('Axios Response:', response);
        const product = response.data.product;
        console.log('productData:', product);
        setProductData(product);
      } catch (error) {
        console.error('Error fetching product:', error.message);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      } finally {
        setLoading(false);
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
      const response = await axios.put(`http://localhost:5000/api/Seller/editProduct/${productId}`, productData);
      console.log("dataedit",response.data);
   
      navigate(`/seller`);
    } catch (error) {
      console.error('Error updating product:', error.message);

      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
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
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>
              <h5>Product Name</h5>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={productData.ProductName}
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
              placeholder="description"
              value={productData.description}
              onChange={handleInputChange}
              name="description"
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='price' >
            <Form.Label>
              <h5>price</h5>
            </Form.Label>
            <Form.Control
              type="number"
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