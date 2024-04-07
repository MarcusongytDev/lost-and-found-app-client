import { Container } from 'react-bootstrap';
import './lostItemCatalog.css';
import Maps from "../components/API/GoogleMaps.js";
import GoogleMaps from "../components/API/GoogleMaps.js";

function LostItemMap(){

    return(
        <Container fluid>
            <body>
                <div id="google-maps">
                    <GoogleMaps/>
                </div>
            </body>
        </Container>
    )
}

export default LostItemMap;