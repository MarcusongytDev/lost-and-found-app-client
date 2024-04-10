  import { useEffect, useState} from "react";
  import {useLoadScript} from "@react-google-maps/api";
  import {useNavigate} from "react-router-dom";
  import axios from "axios";
  import Card from 'react-bootstrap/Card';
  import ListGroup from 'react-bootstrap/ListGroup';
  import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
  } from "@vis.gl/react-google-maps";
  import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  import './GoogleMaps.css';
  

  export default function GoogleMaps() {
    
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc",
      libraries: ["places"],
    });

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const defaultPosition = { lat: 1.349, lng: 103.739 }

    // Selected allows us to pass a location and render it as a market on the map
    const [selected, setSelected] = useState();

    const [listOfLocations, setListOfLocations] = useState([]);

    const [pos, setPos] = useState();


    useEffect(() => {
      axios.get("http://localhost:5000/get-lost-items").then((response) => {
        setListOfLocations(response.data["allLostItems"]);
      });
    }, []);
    
    const KEY = "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc";

    const [selectedKey, setSelectedKey] = useState(false);

      // Get user's current locations

    if (!isLoaded) return <div>Loading...</div>;

    return (
      <APIProvider>
        <PlacesAutocomplete className="Gmaps-Searchbar" setSelected = {setSelected}/>
        <Map defaultZoom={15} defaultCenter={defaultPosition} mapId={"95ff34d67269854f"} className="map-container">
        {listOfLocations.map((value, key) => {
          const LAT = Number(value["location"][1]);
          const LNG = Number(value["location"][2]);
          const setPosition = {lat: LAT, lng: LNG};
          console.log(setPosition);
          


          if(LAT != (undefined||null)){
            // fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${String(LAT)},${String(LNG)}&key=${KEY}`).then((res) => {
            //   return res.json()
            // }).then((data) => {
            //   setPos(data["results"][1]["formatted_address"]);
            // }).catch((e) => {
            //   console.log("No formatted address");
            // });

            

            return(
              <>
                <AdvancedMarker position={setPosition} onClick={() => {setSelectedKey(key+1)}}>
                  <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'}/>
                  {selectedKey==(key+1) && (
                  <InfoWindow position={setPosition} onCloseClick={() => {setSelectedKey(false)}}>
                    <Card style={{ width: '400px'}} onClick={() => {navigate(`/LostItemDescription/${key}`)}} className="LIC-Card-Hover">
                    <Card.Img variant="top" src={value["ImageURL"]} className="LIC-Card-Image" />
                    <Card.Body>
                        <Card.Title style={{fontWeight: "bold"}}>{value["name"]}</Card.Title>
                        <Card.Text>
                            <p>{value["itemFilters"]}</p>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup variant="flush" style={{fontStyle: "italic"}} >
                        <ListGroup.Item>
                          {/* <strong>Location :</strong>{pos} */}
                        </ListGroup.Item>
                    </ListGroup>
                    </Card>
                  </InfoWindow>
                  )
                }
                </AdvancedMarker>
              </>
            );
          }
          else{
            console.log("No Location Inputted");
          }
          })
        }
        {selected && (
          <>
            <AdvancedMarker position={selected}>
              <Pin />
            </AdvancedMarker>
            <InfoWindow disableAutoPan={false} position={selected} onCloseClick={() => setOpen(false)}>
              <p><strong>Selected Location</strong></p>
            </InfoWindow>
          </>
        )}
      </Map>
    </APIProvider>
  );
}

  const PlacesAutocomplete = ({setSelected}) =>{
    const {
      ready,
      value,
      setValue,
      suggestions: {status, data},
      clearSuggestions,
    } = usePlacesAutoComplete();

    const handleSelect = async(address) => {
      setValue(address, false);
      clearSuggestions();
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      setSelected({lat, lng});
    }
    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          disabled={!ready} 
          className="combobox-input" 
          placeholder="Search For Address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    )
  }