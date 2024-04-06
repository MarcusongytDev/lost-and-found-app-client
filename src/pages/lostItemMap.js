import { Container } from 'react-bootstrap';
import './lostItemCatalog.css';
import Maps from "../components/API/GoogleMaps.js";

function LostItemMap(){

    return(
        <Container fluid>
            <body>
                <div id="google-maps">
                    <h1>Hi</h1>
                    <Maps/>
                </div>
            </body>
        </Container>
    )
}

export default LostItemMap;