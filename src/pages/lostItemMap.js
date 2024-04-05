import { Container } from 'react-bootstrap';
import './lostItemCatalog.css';
import GoogleMaps from "../components/API/GoogleMaps.js";

function LostItemMap(){

    return(
        <Container fluid>
            <body>
                <h1>whats good bruh</h1>
                <div id="google-maps"><GoogleMaps/></div>
            </body>
        </Container>
    )
}

export default LostItemMap;