
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card, CardBody, CardTitle, Button, Form, FormGroup, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';



function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);


  useEffect(() => {
    // Retrieve cart data using manual parsing for compatibility
    const isLoggedIn = sessionStorage.getItem('token');
    if(isLoggedIn){
      const decodedToken = jwtDecode(isLoggedIn);
  
        const userId = decodedToken.userId;
        const cartCookie = Cookies.get(userId);
        const parsedCartCookie = cartCookie ? JSON.parse(cartCookie) : {};
        const userCartItems = Object.values(parsedCartCookie)
            .filter(item => item.userId === userId); // replace loggedInUserId with the actual user ID
    
          setCartItems(userCartItems);
       
    }

   
  }, []);
  
  useEffect(() => {
    // Calculate totals
    let productsCount = 0;
    let totalPrice = 0;
    let totalQuantity = 0;

    cartItems.forEach((item) => {
      productsCount += 1;
      totalPrice += item.quantity * item.productDetails.price;
      totalQuantity += item.quantity;
    });

    setTotalProducts(productsCount);
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [cartItems]);

  const isLoggedIn = sessionStorage.getItem('token');

 
    const handleDeleteProduct = (productId) => {
      const isLoggedIn = sessionStorage.getItem('token');
      const decodedToken = jwtDecode(isLoggedIn);
      
            const userId = decodedToken.userId;
    // Update cart state:
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.productDetails.id !== productId)
    );
  
    // Update cookie (using manual parsing):
    const cartCookie = Cookies.get(userId);
    if (cartCookie) {
      const parsedCartCookie = JSON.parse(cartCookie);
      const itemToDelete = parsedCartCookie[productId];
      if (itemToDelete && itemToDelete.quantity) {
        delete parsedCartCookie[productId];
        Cookies.set(userId, JSON.stringify(parsedCartCookie));
      }
    }
    if (cartItems.length === 1) {
      setShowModal(true);
    }


  };
  
  const handleIncrementQuantity = (productId) => {
    const isLoggedIn = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(isLoggedIn);
    
          const userId = decodedToken.userId;
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productDetails.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  
    // Update cookie:
    const cartCookie = Cookies.get(userId) || '{}';
    const parsedCartCookie = JSON.parse(cartCookie);
    parsedCartCookie[productId].quantity += 1;
    Cookies.set(userId, JSON.stringify(parsedCartCookie));
  };
  
  const handleDecrementQuantity = (productId) => {
    const isLoggedIn = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(isLoggedIn);
    
          const userId = decodedToken.userId;
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productDetails.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item

      )
    );
  
    // Update cookie:
    const cartCookie = Cookies.get(userId) || '{}';
    const parsedCartCookie = JSON.parse(cartCookie);
    parsedCartCookie[productId].quantity -= 1;
    if (parsedCartCookie[productId].quantity === 0) {
      delete parsedCartCookie[productId];
      if (cartItems.length === 1) {
        setShowModal(true);
        navigate('/');
      }
  
    }
    Cookies.set(userId, JSON.stringify(parsedCartCookie));
    
  

    
  };
  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');

  };
  const handlePayment = () => {
    // Add your payment logic here
    console.log('Payment logic goes here');
  };

  if(isLoggedIn){

    return (
      <section className="h-100 h-custom">
  
      <Container className="py-5 h-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} md={7}>
          <Card>
            <Card.Body>
              <h5>
                <Link to="/" className="text-body">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left mx-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                  </svg>
                  Continue shopping
                </Link>
              </h5>
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.productDetails.id}>
                      <td>
                        <img
                          src={item.productDetails.productImage}
                          alt={item.productDetails.productName}
                          className="img-fluid rounded-3"
                          style={{ width: 65 }}
                        />
                        <br />
                        {item.productDetails.productName}
                      </td>
                      <td>{item.productDetails.description}</td>
                      <td>
                        <Button
                          variant="light"
                          onClick={() => handleIncrementQuantity(item.productDetails.id)}
                          className="border-0"
                        >
                          +
                        </Button>
                        {item.quantity}
                        <Button
                          variant="light"
                          onClick={() => handleDecrementQuantity(item.productDetails.id)}
                          className="border-0"
                        >
                          -
                        </Button>
                      </td>
                      <td>${item.productDetails.price}</td>
                      <td>
                        <Button variant="link" onClick={() => handleDeleteProduct(item.productDetails.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={5}>
          <Card className="bg-primary text-white rounded-3">
            <Card.Body>
              <Card.Title>
                <h5>Total Price</h5>
              </Card.Title>
              <Form>
                <FormGroup>
                  <p>Total Products: {totalProducts}</p>
                  <p>Total Quantity: {totalQuantity}</p>
                  <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </FormGroup>
                  <Link to={'/Payment'}> <Button variant="light">Proceed to Payment</Button></Link>    
               
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Empty Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>No items in the cart.Make your cart Fill Go And Purchase</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseModal}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
      </section>
    );
  }
  else{
    alert("Please Login to check Cart Details")
    navigate("/login")
  }


 


}

export default CheckOut;