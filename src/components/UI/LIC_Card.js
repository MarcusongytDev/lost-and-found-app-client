import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LIC_Card.css';

export default function LIC_Card(props){
    let navigate = useNavigate();
    const routeChange = () =>{
      let path = "";
      navigate(path);
    }

    const [postObject, setPostObject] = useState({});
    const [locationObject, setlocationObject] = useState();

    // useEffect(() =>{
    //     axios.get('http://localhost:5000/posts/:id').then((response)=>{
    //         setPostObject(response.data);
    //     })
    // })
    // postObject.img
    // postObject.itemTags
    // postObject.ItemDescription
    // postObject.LocationFound
    const KEY = "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc";
    const LAT = String(props.locationFound[1]);
    const LNG = String(props.locationFound[2]);
    const url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
    console.log(url)

    useEffect(() => {
        fetch(url).then((res) => {
            return res.json();
        }).then((data) => {
            setlocationObject(data["results"][1]["formatted_address"]);
        }).catch((e) => {console.log("no formatted address available")})
    },[]);

    // Process JSON object
    const tagsStringify = props.tags;
    const tags = JSON.parse(tagsStringify);

    console.log(tags);
    console.log(Object.keys(tags))
    console.log(tags[0])

    return(
        <Card style={{ width: '400px'}} onClick={routeChange} className="LIC-Card-Hover">
            <Card.Img variant="top" src={props.ImageURL} className="LIC-Card-Image" />
            <Card.Body>
                <Card.Title style={{fontWeight: "bold"}}>{props.name}</Card.Title>
                <Card.Text>
                {Object.keys(tags).map((value, key) => {
                    return(
                    <li>{tags[key]}</li>
                    );
                })}
                </Card.Text>
            </Card.Body>
            <ListGroup variant="flush" style={{fontStyle: "italic"}}>
                <ListGroup.Item>
                    Location : {locationObject}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}
