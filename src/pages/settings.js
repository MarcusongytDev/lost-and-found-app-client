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
import Toggle from '../components/UI/modeToggleBtn';
import bugimage from '../assets/bug-icon.jpg';
import qnimage from '../assets/questionmark-icon.png';
import faqimage from '../assets/faq-icon.png';
import globeimage from '../assets/globe-icon.png';
import commentimage from '../assets/comment-icon.png';

function Settings(){
    return(
        <Container className ="settings-overall-settings">  
            <Container className="header-text-settings col-sm-10 mx-auto">
                <h1>Settings</h1>
            </Container>
            <Container fluid className="justify-content-center col-sm-6 mx-auto">
                <Row>
                    <Col className="text-settings">Light Mode</Col>
                    <Col><div className="btn-settings"><Toggle/></div></Col>
                    <Col className="text-settings">Dark Mode</Col>
                </Row>
            </Container>
            <Container fluid className="justify-content-center col-sm-7 mx-auto">
                <Row style={{position: "relative", right: "40px"}}>
                    <Col style={{position: "relative", left: "80px"}}><img className="settings-img" src={bugimage} alt="Bug Icon"/></Col>
                    <Col className="settings-text-settings" style={{float: "right"}}><h4>Report A Bug</h4></Col>
                </Row>
                <hr className="solid"/>
                <Row style={{position: "relative", right: "40px"}}>
                    <Col style={{position: "relative", left: "80px"}}><img className="settings-img" src={qnimage} alt="Question Mark Icon"/></Col>
                    <Col className="settings-text-settings" style={{float: "right"}}><h4>Help</h4></Col>
                </Row>
                <hr className="solid"/>
                <Row style={{position: "relative", right: "40px"}}>
                    <Col style={{position: "relative", left: "80px"}}><img className="settings-img" src={globeimage} alt="Globe Icon"/></Col>
                    <Col className="settings-text-settings" style={{float: "right"}}><h4>Language</h4></Col>
                </Row>
                <hr className="solid"/>
                <Row style={{position: "relative", right: "40px"}}>
                    <Col style={{position: "relative", left: "80px"}}><img className="settings-img" src={commentimage} alt="Comment Icon"/></Col>
                    <Col className="settings-text-settings" style={{float: "right"}}><h4>Feedback</h4></Col>
                </Row>
                <hr className="solid"/>
                <Row style={{position: "relative", right: "40px"}}>
                    <Col style={{position: "relative", left: "80px"}}><img className="settings-img" src={faqimage} alt="FAQ Icon"/></Col>
                    <Col className="settings-text-settings" style={{float: "right"}}><h4>FAQ</h4></Col>
                </Row>
                <hr className="solid"/>
            </Container>    
            <Accordion className="col-sm-9 mx-auto" style={{paddingBottom: "20px"}}>
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
        </Container>
    )
}

export default Settings;