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


/*
function LostItemDescription() {
    // let {id} = useParams()
    // const [postObject, setPostObject] = useState([]); // [] since API req returns a list setListOfPosts is a function to change the lists of posts
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/posts/byID/${id}`).then((response) => {
    //         setPostObject(response.data);
    //     })
    // });
    let navigate = useNavigate();
    const routeChange = () =>{
      let path = "";
      navigate(path);
    }

    return (
        <>
          <Container fluid style={{textAlign: "center", paddingTop: "10px"}}>
            <h1>Lost Items Reported</h1>
          </Container>
          <Container fluid className="LIC-Catalog" style={{paddingTop: "20px"}}>
            <Row>
              <Col xs={4} className="LIC-Flexbox">
                <LIC_Card/>
              </Col>
            </Row>
          </Container>
        </>
      );
}

export default LostItemDescription;
*/

function LostItemDescription() {
    const { id } = useParams();

    // Example product details
    // In a real application, you would fetch these details from an API or a Redux store
    const product = {
        id: id,
        name: "Lost Item Description",
        location: "Example Location",
        email: "example@example.com",
        phoneNumber: "+1234567890",
        itemFilter: "Example Filter",
        description: "This is an example product.",
        imageUrl: "https://via.placeholder.com/150"
    };

    return (
        <div className="product-detail-page">
            <header className="page-header">
                <h1>{product.name}</h1>
            </header>
            <div className="product-detail-container">
                <div className="product-image-container">
                    <img src={product.imageUrl} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Location:</strong> {product.location}</p>
                    <p><strong>Email:</strong> {product.email}</p>
                    <p><strong>Phone Number:</strong> {product.phoneNumber}</p>
                    <p><strong>Item Filter:</strong> {product.itemFilter}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                </div>
            </div>
        </div>
    );
}
export default LostItemDescription;