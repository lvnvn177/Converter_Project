import React from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Custom.css'


/*import home from './pages/home';
import service from './pages/service';
import Inform from './pages/inform';*/

/*function Navigation() {
    return (
      <Navbar collapseOnSelect expand="lg" className="color-nav">
        <Container>
          <Navbar.Brand as={Link} to="/App">Converter OCR</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/service">OCR 웹서비스</Nav.Link>
              <Nav.Link as={Link} to="/Inform">설명</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }*/

function Navigation() {
    return (
        <div className="Navigation">
            <Navbar collapseOnSelect expand="lg" className="color-nav" >
                <Container>
                    <Navbar.Brand href="#home">Converter OCR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#web_service">OCR 웹서비스</Nav.Link>
                        <Nav.Link href="#inform">설명</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


export default Navigation;