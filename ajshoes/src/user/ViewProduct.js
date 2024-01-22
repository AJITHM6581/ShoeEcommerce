import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function ViewProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({});
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const fetchProductDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/seller/viewproduct/${productId}`);
      setProductData(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= 20) {
      setSelectedQuantity(newQuantity);
    } else {
      alert('Please enter a valid quantity (1-20)');
    }
  };
  
  const handleAddToCart = async () => {
    const isLoggedIn = sessionStorage.getItem('token');

    try {
      if (isLoggedIn) {
        const decodedToken = jwtDecode(isLoggedIn);
        const userId = decodedToken.userId;

        // Get existing cart cookie or create an empty one
        const cartCookie = Cookies.get(userId) || '{}';
        const parsedCartCookie = JSON.parse(cartCookie);

        // Check if the product is already in the cart
        if (parsedCartCookie[productId]) {
          // Update existing product quantity
          parsedCartCookie[productId].quantity += selectedQuantity;
          console.log('Product added to existing cart entry.');
        } else {
          // Add new product to cart cookie
          parsedCartCookie[productId] = {
            productDetails: productData,
            userId,
            quantity: selectedQuantity,
          };
          console.log('New product added to cart.');
        }

        // Set the updated cart cookie
        Cookies.set(userId, JSON.stringify(parsedCartCookie));

        // Notify user of successful addition (visually or with a message)
        console.log('Cart cookie updated successfully.');

        // Navigate to the cart component
        navigate('/cart');
      } else {
        // Handle the case where the user is not logged in
        console.log('User not logged in.');
        // Redirect to login page or display a message
        navigate('/login');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      // Handle errors appropriately (e.g., display error messages)
    }
  };

  
  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img className="img-fluid rounded mb-4" src={productData.productImage} alt={productData.ProductName} />
            </div>
            <div className="col-md-6">
              <h1 className="display-4 fw-bolder">{productData.ProductName}</h1>
              <p className="lead">{productData.description}</p>
              <div className="mb-3">
                <span className="text-decoration-line-through me-2">Original Price: {productData.originalPrice} Rs</span>
                <span className="fw-bold">Discounted Price: {productData.price} Rs</span>
              </div>
              <p className="lead">{productData.rating} Rating</p>
              <div className="d-flex align-items-center">
                <div className="quantity-group me-4">
                  <span className="me-2">Quantity:</span>
                  <input
                    className="form-control"
                    type="number"
                    min={1}
                    max={20}
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={handleAddToCart}
                  
                >
                  <i className="bi-cart-fill me-1"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProduct;
