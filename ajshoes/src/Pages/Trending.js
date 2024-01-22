import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, Button, Col, Row } from 'react-bootstrap'; 

const Trending= () => {
  const [item, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
   
        const response = await axios.get( 'http://localhost:5000/api/seller/viewproduct');
        console.log(response);

        
        const result = response.data;

        
        setItems(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    
    <div>
    <Row>
      {item.map(items => (
        <Col key={items.id} sm={12} md={6} >
          <Card style={{ margin: '10px' }}>
            <Card.Img variant="top" src={items.
productImage
} alt={items.ProductName} />
            <Card.Body>
              <Card.Title>{items.ProductName}</Card.Title>
              <Card.Text>
                {items.description}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );

      }

export default Trending

