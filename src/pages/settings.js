import React from "react";
import axios from 'axios';
import {useEffect, useState} from 'react'; // Used for api calls to server
import {useNavigate} from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './settings.css';
import Toggle from '../components/modeToggleBtn';

function Settings(){
    return(
        <>  
            <Container className="header-text-settings col-sm-10 mx-auto">
                <h1>Settings</h1>
            </Container>
            <Container className="justify-content-center col-sm-4 mx-auto">
                <Row>
                    <Col className="text-settings" style={{position: "relative", left: "20px"}}>Light Mode</Col>
                    <Col><div className="btn-settings"><Toggle/></div></Col>
                    <Col className="text-settings" style={{position: "relative", right: "20px"}}>Dark Mode</Col>
                </Row>
            </Container>
            <Accordion className="col-sm-4 mx-auto">
                <Accordion.Item eventKey="0" className="accordion-item-settings">
                    <Accordion.Header>What do i do if i lost an item?</Accordion.Header>
                    <Accordion.Body>
                    Click lost an item. You can access the map to see if your item has been found or submit a lost item notice
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="accordion-item-settings">
                    <Accordion.Header>What do i do if i found an item?</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className="accordion-item-settings">
                    <Accordion.Header>How do i contact the person who found my item?</Accordion.Header>
                    <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default Settings;