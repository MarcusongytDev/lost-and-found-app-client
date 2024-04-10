import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './template.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import navbaricon from "../assets/navbar-dropdown-icon.png";

function Template(){
    return(
        // Navigation Bar
        <>
            <body className="template-background"></body>
            <Navbar expand="lg" className="justify-content-center navbar-dark navbar-custom">
                <Container fluid>
                <Navbar.Brand className="navbar-custom" href="/home">Lost & Found</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                        <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                        <NavDropdown.Item href="/lostItemNotice">Lost Item Notice</NavDropdown.Item>
                        <NavDropdown.Item href="/lostItemCatalog">Lost Item Catalog</NavDropdown.Item>
                        <NavDropdown.Item href="/foundItemNotice">Found Item Notice</NavDropdown.Item>
                        <NavDropdown.Item href="/contactFinder">Contact Finder</NavDropdown.Item>
                        <NavDropdown.Divider />
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Footer */}
            <Container className='template-footer'>
                <footer><Card body className="justify-content-center navbar-custom template-footer text-center">Version 1.0 Group Varghes</Card></footer>
            </Container>
        </>
    );
}

export default Template;