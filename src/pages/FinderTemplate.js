import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Container, Card} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './FinderTemplate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import navbaricon from "../assets/navbar-dropdown-icon.png";

function FinderTemplate(){
    return(
        // Navigation Bar
        <>
            <body className="template-background"></body>
<Navbar expand="lg" className="justify-content-center navbar-dark navbar-custom"> 
    <Container fluid>
        <Navbar.Brand className="navbar-custom" href="/home">Lost & Found</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" /> 
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"> {/* Add me-auto for left alignment */}
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/settingsFinder">Settings</Nav.Link>
                <Nav.Link href="/foundItemNotice">Found Item Notice</Nav.Link>
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

export default FinderTemplate;