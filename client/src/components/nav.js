import React from 'react';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './Custom.css'


function Navigation() {
    return (
        <div className="Navigation">
            <Navbar collapseOnSelect expand="lg" className="color-nav" >
            <Container>
                    <Navbar.Brand as={Link} to="/home">Converter OCR</Navbar.Brand> {/* Link 컴포넌트를 사용하여 '/' 경로로 이동 */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* Link 컴포넌트를 사용하여 '/service' 경로로 이동 */}
                            <Nav.Link as={Link} to="/service">OCR 웹서비스</Nav.Link>
                            {/* Link 컴포넌트를 사용하여 '/inform' 경로로 이동 */}
                            <Nav.Link as={Link} to="/inform">설명</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


export default Navigation;