import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function View() {
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  const fetchProduct = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/api/seller/viewProduct/${productId}`);
      setProduct(result.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {

    fetchProduct();
  }, [productId]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Product Details</h2>

      <Card  >
        <Card.Img variant="top" src={product.productImage} style={{ height: '400px', objectFit: 'contain',paddingTop:'20px' }} />
        <Card.Body>
          <Card.Title>{product.ProductName}</Card.Title>
          <Card.Text>
            <p>Category ID: {product.categoryId}</p>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Review: {product.review}</p>
            <p>Vendor: {product.vendorName}</p>
            <p>Warranty: {product.warranty} Days</p>

          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default View;