import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './template.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Template(){
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
            <Navbar.Brand style = {{position:"relative", right:180}} href="/home">Lost & Found</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style = {{position:"relative", left:880}}>
                <Nav className="me-auto">
                <Nav.Link className ="headerLink" href="/home">Home</Nav.Link>
                <Nav.Link className ="headerLink" href="/lostItemNotice">Lost Item Notice</Nav.Link>
                <Nav.Link className ="headerLink" href="/lostItemCatalog">Lost Item Catalog</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Lost Item Notice</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Lost Item Catalog</NavDropdown.Item>
                    <NavDropdown.Divider />
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Template;