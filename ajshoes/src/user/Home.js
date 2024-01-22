import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const [items, setItems] = useState([]);
  const [carouselImages, setCarouselImages] = useState([
    "https://i.postimg.cc/wBHZQ9qC/Carousel.png",
    "https://i.postimg.cc/fLCYYcnc/5f5380ec84597.png",
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/seller/viewproduct');
        const result = response.data.product;
        setItems(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewButtonClick = (productId) => {
    navigate(`/viewProduct/${productId}`);
  };
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKey, setSearchKey] = useState('');


 

const handleFilter = (category) => {
  setSearchKey(category);
  if (category) {
    const filtered = items.filter((product) => product.categoryId === category); // Change 'products' to 'items'
    setFilteredProducts(filtered);
  
  } else {
    setFilteredProducts(items); // Change 'products' to 'items'
  }
};

const handleSearch = (filteredProducts) => {
  setFilteredProducts(filteredProducts);
};


  return (
    <div>
      <div className="mb-4">
        <Carousel>
          {carouselImages.map((Image, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={Image} alt={`Image ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="container-fluid mt-4 text-center mb-4">
        <div
          className="d-flex align-items-center justify-content-center"
          style={{
            height: '80vh',
            background: 'pink',
          }}
        >
          <div>
            <h1>
█▓▒▒░░░Welcome░░░▒▒▓█</h1>
          </div>
          <img
  src="https://i.postimg.cc/pTDh0S4h/hero-image.png"
  alt="Hero Image"
  className="img-fluid"
  style={{ maxWidth: '100%', maxHeight: '100%' }}
/>

        </div>
      </div>

      <div className="container mt-4">
        <h2 className="mb-4"></h2>
        <Row>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Button
              variant={searchKey === '1' ? 'primary' : 'light'} // Add 'primary' class if 'MensKIck' is selected
              block
              onClick={() => handleFilter('1')}
              
              type="button"
              className="btn btn-light"
            >
              MensKIck
            </Button>
          </Col>

          <Col xs={12} sm={6} md={3} lg={3}>
            <Button variant="secondary" block onClick={() => handleFilter('2')}>
              WomensKIcK
            </Button>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Button variant="success" block onClick={() => handleFilter('3')}>
              KidsKIcK
            </Button>
          </Col>
          <Col xs={12} sm={6} md={3} lg={3}>
            <Button   onClick={() => handleFilter('')} variant="danger" block>
             view all
            </Button>
          </Col>
        </Row>
      </div>

      <div className="container mt-4">
  <Row>
    {filteredProducts.map((item) => (
      <Col key={item.id} sm={12} md={6} lg={3}>
        <Card style={{ margin: '10px', width: '100%' }}>
          <Card.Img
            variant="top"
            src={item.productImage}
            alt={item.ProductName}
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Card.Body>
            <Card.Title>{item.ProductName}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{item.price}</Card.Text>
            <button type="button" onClick={() => handleViewButtonClick(item.id)}>
              View
            </button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</div>

    </div>
  );
};

export default Home;
