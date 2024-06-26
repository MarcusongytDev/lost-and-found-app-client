import React from "react";
import {useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useEffect, useState} from 'react'; // Used for api calls to server
import 'bootstrap/dist/css/bootstrap.min.css';
import './lostItemDescription.css';
import LIC_Card from "../components/UI/LIC_Card";
import tempImage from "../assets/questionmark-icon.png";

export default function LostItemDescription() {
    const { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [displayLocation, setDisplayLocation] = useState();
    const [postObjectItemFilters, setPostObjectItemFilters] = useState({});
    // Example product details
    // In a real application, you would fetch these details from an API or a Redux store
    const product = {
        id: id,
        name: "Lost Item Description",
        location: "Example Location",
        dateTimeFound: "10/10/2001 10:00:00",
        email: "example@example.com",
        phoneNumber: "+1234567890",
        itemFilters: "Example Filter",
        description: "This is an example product.",
        imageUrl: "https://via.placeholder.com/150"
    };

    useEffect(() => {
      axios.get("http://localhost:5000/get-lost-items").then((response) => {
        setPostObject(response.data["allLostItems"][id]);
        const LAT = String(response.data["allLostItems"][id]["location"][1]);
        const LNG = String(response.data["allLostItems"][id]["location"][2]);
        const KEY = "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc";
        const url =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;
        fetch(url).then((res) => {
          return res.json();
        }).then((data) => {
          setDisplayLocation(data["results"][1]["formatted_address"]);
        }).catch((e) => {console.log("no formatted address available")})
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:5000/get-lost-items").then((response)=>{
        setPostObjectItemFilters(response.data["allLostItems"][id]["itemFilters"]);
      }
    )});


    return (
        <div className="product-detail-page">
            <header className="page-header">
                <h1>{product.name}</h1>
            </header>
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src={postObject.ImageURL} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                    <p><strong>Name:</strong> {postObject.name}</p>
                    <p><strong>Location:</strong> {displayLocation}</p>
                    <p><strong>Date & Time Found: </strong>{postObject.dateFound + " " + postObject.timeFound}</p>
                    <p><strong>Email:</strong> {postObject.email}</p>
                    <p><strong>Phone Number:</strong> {postObject.phoneNumber}</p>
                    <p><strong>Item Filters: </strong>
                    {Object.keys(postObjectItemFilters).map((value, key) => {
                      if(postObjectItemFilters == undefined || postObjectItemFilters == null){
                        return ;
                      }else{
                      return(
                        <li>{postObjectItemFilters[key]}</li>
                      )};
                      })
                    }
                    </p>
                    <p><strong>Description:</strong> {postObject.description}</p>
                </div>
            </div>
        </div>
    );
}