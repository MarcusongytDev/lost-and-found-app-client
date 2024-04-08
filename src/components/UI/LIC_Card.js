import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import tempImage from "../../assets/questionmark-icon.png"
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LIC_Card.css';

function LIC_Card(){
    let navigate = useNavigate();
    const routeChange = () =>{
      let path = "";
      navigate(path);
    }

    const [postObject, setPostObject] = useState({});

    // useEffect(() =>{
    //     axios.get('http://localhost:5000/posts/:id').then((response)=>{
    //         setPostObject(response.data);
    //     })
    // })
    // postObject.img
    // postObject.itemTags
    // postObject.ItemDescription
    // postObject.LocationFound

    return(
        <Card style={{ width: '400px'}} onClick={routeChange} className="LIC-Card-Hover">
            <Card.Img variant="top" src={tempImage} className="LIC-Card-Image" />
            <Card.Body>
                <Card.Title style={{fontWeight: "bold"}}>Item Tags</Card.Title>
                <Card.Text>
                Item Description Sample Text
                </Card.Text>
            </Card.Body>
            <ListGroup variant="flush" style={{fontStyle: "italic"}}>
                <ListGroup.Item>Location Found: Test</ListGroup.Item>
            </ListGroup>
        </Card>
    );
}

export default LIC_Card;