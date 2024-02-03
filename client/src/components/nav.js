import React from 'react';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Custom.css'

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