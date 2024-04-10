import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './lostItemCatalog.css';
import LIC_Card from "../components/UI/LIC_Card";
import Form from 'react-bootstrap/Form';
import { useAuth } from '../context/AuthContext'; 

function LostItemCatalog() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [keyword, setKeyword] = useState("");

    const { user } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/get-lost-items").then((response) => {
      const allPosts = response.data["allLostItems"];
      setListOfPosts(allPosts);
      setFilteredPosts(allPosts); 
    }); });
     // if (!user) {
     //   navigate('/loginPage');
     // }
  //}, [user, navigate]);

  const highlightMatch = (tag, keyword) => {
    if (!keyword) return tag; // If keyword is empty, return the original tag
    const regex = new RegExp(keyword, 'gi'); // Create a case-insensitive regex
    return tag.replace(regex, (match) => `<mark>${match}</mark>`); // Wrap matching parts in <mark> tags
  };

  const handleKeywordChange = (event) => {
    const newKeyword = event.target.value.toLowerCase();
    setKeyword(newKeyword);

    const filtered = listOfPosts.filter(post => {
      const tags = Object.values(post.itemFilters);  
      return tags.some(tag => tag.toLowerCase().includes(newKeyword)); 
    });

    setFilteredPosts(filtered); 
  };

  const routeChange = () => {
    let path = "";
    navigate(path);
  };

  return (
    <>
      <Container fluid style={{ textAlign: "center", paddingTop: "10px" }}>
        <Row>
          <Col md={8}>
            <h1>Lost Items Reported</h1>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Form.Control type="text" placeholder="Keyword Filter" className="me-2" value={keyword} onChange={handleKeywordChange}/>
          </Col>
        </Row>
      </Container>

      <Container fluid className="LIC-Catalog" style={{ paddingTop: "20px" }}>
        <Row>
          {filteredPosts.map((value, key) => (
            <Col xs={4} className="LIC-Flexbox" key={key} onClick={() => navigate(`/LostItemDescription/${key}`)}>
              <LIC_Card 
                name={value.name} 
                tags={value.itemFilters} 
                locationFound={value.location}
                dateFound={value.dateFound}
                timeFound={value.timeFound}
                ImageURL={value.ImageURL} 
                keyword={keyword} 
                highlightMatch={highlightMatch} 
              /> 
            </Col>
          ))}
        </Row>
      </Container>

      <Container fluid style={{ textAlign: "center", margin: "20px 0", paddingBottom: "20px" }}>
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
  );
};

export default LostItemCatalog;