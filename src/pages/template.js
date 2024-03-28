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
        <Navbar expand="lg" className="bg-body-tertiary justify-content-center">
            <Container>
            <Navbar.Brand  href="/home">Lost & Found</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style = {{position:"relative", left:880}}>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/home">Home</NavDropdown.Item>
                    <NavDropdown.Item href="/lostItemNotice">Lost Item Notice</NavDropdown.Item>
                    <NavDropdown.Item href="/lostItemCatalog">Lost Item Catalog</NavDropdown.Item>
                    <NavDropdown.Divider />
                </NavDropdown>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Template;