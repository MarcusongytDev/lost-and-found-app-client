import React from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LIC_Card.css'; 

export default function LIC_Card(props) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "";
    navigate(path);
  };

  const [locationObject, setlocationObject] = useState("");

  const KEY = "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc";
  const LAT = String(props.locationFound[1]);
  const LNG = String(props.locationFound[2]);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setlocationObject(data["results"][1]["formatted_address"] || "Location Unavailable"))
      .catch(() => console.log("Error fetching address")); 
  }, []);

  return (
    <Card style={{ width: '400px' }} onClick={routeChange} className="LIC-Card-Hover"> 
      <Card.Img variant="top" src={props.ImageURL} className="LIC-Card-Image" />
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold" }}>{props.name}</Card.Title>
        <Card.Text>
          {Object.keys(props.tags).map((key, index) => ( 
            <li key={index} dangerouslySetInnerHTML={{__html: props.highlightMatch(props.tags[key], props.keyword)}} />
          ))}
        </Card.Text>
      </Card.Body>
      <ListGroup variant="flush" style={{ fontStyle: "italic" }}>
        <ListGroup.Item>Location: {locationObject}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}