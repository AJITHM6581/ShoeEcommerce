import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Header.css'

function Header() {
  return (
    <div>
      <Navbar expand="lg" className="Navhome sticky-top"> {/* Add sticky-top class here */}
        <Container className=''>
          <Navbar.Brand id='logo' >AJ SHOES</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="">Home</Nav.Link>
              {/* Add your NavDropdown and other Nav.Link components here */}
            </Nav>
            <Form inline className='search'>
              <Row>
                <Col xs="auto" className='search'>
                  <Form.Control 
                    type="text"
                    placeholder="search"
                    className="mr-sm-2"
                  />
                </Col>
              </Row>
            </Form>
            <Nav.Link href="/Login" className='log'>Login</Nav.Link><br/>
            <Nav.Link href="/Cart"><img src="https://i.postimg.cc/3JXVQBS5/download-2.png" alt="" className='cart'/></Nav.Link>
            <Nav.Link href="/Sign" className='log'>Sign UP</Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header
