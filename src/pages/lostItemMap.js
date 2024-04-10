import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './lostItemCatalog.css';
import Maps from "../components/API/GoogleMaps.js";
import GoogleMaps from "../components/API/GoogleMaps.js";
import GoogleMapsTemplate from "../components/UI/GoogleMapsTemplate.js";
import { useNavigate } from 'react-router-dom';


function LostItemMap(){

    const navigate = useNavigate();

    return(
        <Container fluid>
            <body>
                <GoogleMapsTemplate/>
                <div id="google-maps">
                    <GoogleMaps/>
                </div>
            </body>
        </Container>
    )
}

export default LostItemMap;