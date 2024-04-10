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
import './lostItemCatalog.css';
import LIC_Card from "../components/UI/LIC_Card";
import tempImage from "../assets/questionmark-icon.png";
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext'; 



function LostItemCatalog() {
    // let {id} = useParams()
    // const [postObject, setPostObject] = useState([]); // [] since API req returns a list setListOfPosts is a function to change the lists of posts
    // useEffect(() => {
    //     axios.get(`http://localhost:5000/posts/byID/${id}`).then((response) => {
    //         setPostObject(response.data);
    //     })
    // });
    const { user } = useAuth();
    let navigate = useNavigate();
    const routeChange = () =>{
      let path = "";
      navigate(path);
    }
    // Gets all the posts in database, use .map to create that number of posts in the row.

    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/get-lost-items").then((response) => {
        setListOfPosts(response.data["allLostItems"]);
        console.log(response.data["allLostItems"]);
      });
      if (!user) {
        navigate('/loginPage');
      }
    }, [user, navigate]);

    

  return (
    <>
      {/* Header with Filter Bar */}
      <Container fluid style={{textAlign: "center", paddingTop: "10px"}}>
        <Row>
          <Col md={8}>
            <h1>Lost Items Reported</h1>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Form.Control type="text" placeholder="Keyword Filter" className="me-2" />
          </Col>
        </Row>
      </Container>

      {/* Item Catalog */}
      <Container fluid className="LIC-Catalog" style={{paddingTop: "20px"}}>
        <Row>
          {listOfPosts.map((value, key) => {
            return (
              <Col xs={4} className="LIC-Flexbox" onClick={() => navigate(`/LostItemDescription/${key}`)}>
                <LIC_Card name={value.name} tags={JSON.stringify(value.itemFilters)} locationFound={value.location} ImageURL={value.ImageURL}/>
              </Col>
            );
            })
          }
          
          {/* <Col xs={4} className="LIC-Flexbox" onClick={() => navigate("/LostItemDescription/:id")}>
            <LIC_Card/>
          </Col>
          <Col xs={4} className="LIC-Flexbox" onClick={() => navigate("/LostItemDescription/:id")}>
            <LIC_Card/>
          </Col>
          <Col xs={4} className="LIC-Flexbox" onClick={() => navigate("/LostItemDescription/:id")}>
            <LIC_Card/>
          </Col> */}

        </Row>
      </Container>

      {/* Buttons */}
      <Container fluid style={{textAlign: "center", margin: "20px 0", paddingBottom: "20px"}}>
        <Row>
          <Col>
            <Button variant="primary" href="/lostItemMap" onClick={() => routeChange('/map-view')}>Return to Map View</Button>
          </Col>
          <Col>
            <Button variant="success" href="/lostItemNotice" onClick={() => routeChange('/post-notice')}>Can't Find Item, Post a Notice Now!</Button>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default LostItemCatalog;