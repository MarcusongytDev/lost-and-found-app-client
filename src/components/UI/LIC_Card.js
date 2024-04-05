import React from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LIC_Card.css';
import tempImage from "../../assets/questionmark-icon.png"

function LIC_Card(){
    let navigate = useNavigate();
    const routeChange = () =>{
      let path = "";
      navigate(path);
    }

    return(
        <Card style={{ width: '400px'}} onClick={routeChange} className="LIC-Card-Hover">
            <Card.Img variant="top" src={tempImage} className="LIC-Card-Image" />
            <Card.Body>
                <Card.Title style={{fontWeight: "bold"}}>Item Name</Card.Title>
                <Card.Text>
                Item Description Sample Text
                </Card.Text>
            </Card.Body>
            <ListGroup variant="flush" style={{fontStyle: "italic"}}>
                <ListGroup.Item>Item Category: Test</ListGroup.Item>
                <ListGroup.Item>Location Found: Test</ListGroup.Item>
                <ListGroup.Item>Item Color: Test</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default LIC_Card;