import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';



const Payment = () => {
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [formData, setFormData] = useState({
    orderId: '',
    userId: '',
    deliveryState: '',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    email: '',
    phone: '',
    additionalInfo: '',
    totalPrice: 0,
    products: [],
  });
  const fetchCartItems = async () => {
    const isLoggedIn = sessionStorage.getItem('token');
    if (isLoggedIn) {
      const decodedToken = jwtDecode(isLoggedIn);
      const userId = decodedToken.userId;
      const cartCookie = Cookies.get(userId);
      const parsedCartCookie = cartCookie ? JSON.parse(cartCookie) : {};
      const userCartItems = Object.values(parsedCartCookie)
        .filter((item) => item.userId === userId)
        .map((item) => ({
          ...item,
          productDetails: item.productDetails || {},
        }));
      console.log("usercart", userCartItems)
      if (userCartItems.length > 0) {
        const productDetails = userCartItems.map((item) => ({
          productId: item.productDetails.id,
          quantity: item.quantity,
          productName: item.productDetails.productName,
          totalPrice: item.quantity * item.productDetails.price,
        }));
        console.log("productDetails", productDetails)
        let productsCount = 0;
        let totalPrice = 0;
        let totalQuantity = 0;

        userCartItems.forEach((item) => {
          productsCount += 1;
          totalPrice += item.quantity * item.productDetails.price;

          totalQuantity += item.quantity;
        });


        setTotalProducts(productsCount);
        setTotalPrice(totalPrice);
        setTotalQuantity(totalQuantity);

        setFormData((prevData) => ({
          ...prevData,
          products: productDetails,

        }));
      }
      setOrderId(uuid().slice(0, 5)); // Generate orderId

      setCartItems(userCartItems);


      setFormData((prevData) => ({
        ...prevData,
        orderId: orderId,
        userId: userId,
        totalPrice: totalPrice
      }));
    }

  }
  useEffect(() => {
    setOrderId(uuid().slice(0, 5));
    fetchCartItems();

  }, []);
  const submitOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/seller/orders', formData);

      if (response.status === 200) {
        setShowRazorpay(true);
        console.log('Order submitted successfully');
        console.log('formdata', formData);
      } else {
        console.error('Failed to submit order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    ;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleFormSubmit = (event) => {
    event.preventDefault()
    handlePayment()
    fetchCartItems()
    submitOrder()


  }
  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post('http://localhost:5000/api/razorpay/orders', { amount: totalPrice });
      const orderData = orderResponse.data.data;

      const options = {
        key: 'rzp_test_PPpXOt0wGw2KLn',
        amount: orderData.amount,
        currency: orderData.currency,
        name: formData.firstName,
        description: 'Test Transaction',
        image: 'your_store_logo_url',
        order_id: orderData.id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post('http://localhost:5000/api/razorpay/verify', response);
            console.log(verifyResponse.data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };


return (
  <Container className="my-5 py-5" style={{ maxWidth: '1100px' }}>
  <section>
    {cartItems.length > 0 && (
      <Row>
          <Col md="8">
            <Card className="mb-4">
              <Card.Body>
                <p className="text-uppercase h4 text-font">Delivery State</p>
                <Row>
                  <Col md="1"></Col>
                  <Col md="8">
                    <Form.Select
                      name='deliveryState'
                      value={formData.deliveryState}
                      onChange={handleInputChange}
                      className="custom-select"
                    >
                      <option value="" disabled>Select delivery state</option>
                      <option value="Kozhikode">Kozhikode</option>
                      <option value="Kannur">Kannur</option>
                      <option value="Kochi">Kochi</option>
                      <option value="Thrissur">Thrissur</option>
                      <option value="Trivandrum">Trivandrum</option>
                      <option value="Kollam">Kollam</option>
                      <option value="Palakkad">Palakkad</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md="4" className="mb-4 position-statics">
            <Card className="mb-4">
              <Card.Footer className="mt-4">
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center px-0 fw-bold text-uppercase">
                    Total to pay
                    <span>{totalPrice.toFixed(2)} Rs</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Footer>
            </Card>
          </Col>

          <Col md="8" className="mb-4">
            <Card className="mb-4">
              <Card.Header className="py-3">
                <h5 className="mb-0 text-font text-uppercase">Delivery address</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Row className="mb-4">
                    <Col>
                      <Form.Control
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleInputChange}
                        label='First name'
                        type='text'
                        placeholder='First name'
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleInputChange}
                        label='Last name'
                        type='text'
                        placeholder='Last name'
                      />
                    </Col>
                  </Row>

                  <Form.Control
                    name='companyName'
                    value={formData.companyName}
                    onChange={handleInputChange}
                    label='Company name'
                    type='text'
                    className="mb-4"
                    placeholder='Company name'
                  />
                  <Form.Control
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    label='Address'
                    type='text'
                    className="mb-4"
                    placeholder='Address'
                  />
                  <Form.Control
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    label='Email'
                    type='text'
                    className="mb-4"
                    placeholder='Email'
                  />
                  <Form.Control
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    label='Phone'
                    type='text'
                    className="mb-4"
                    placeholder='Phone'
                  />
                  <Form.Control
                    name='additionalInfo'
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    as='textarea'
                    label='Additional information'
                    rows={4}
                    className="mb-4"
                    placeholder='Additional Info'
                  />


                  <div className="text-center">
                    <Button type="submit" className="button-order col-md-10">
                      Place order
                    </Button>
                   
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          </Row>
        )}

        {cartItems.length === 0 && (
          <div className="text-center">
            <h3>Add products to buy</h3>
            <Link to="/" className="text-body">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left mx-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
              </svg>
              Continue shopping
            </Link>
          </div>
        )}
      </section>
    </Container>
  );
}
export default Payment;