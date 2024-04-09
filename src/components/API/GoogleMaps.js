  import { useEffect, useState} from "react";
  import {useLoadScript} from "@react-google-maps/api";
  import axios from "axios";
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

    const [open, setOpen] = useState(false);

    const defaultPosition = { lat: 1.349, lng: 103.739 }
    // Get places library in google maps api
    const [listOfPins, setListOfPins] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/get-lost-items").then((response) => {
        setListOfPins(response.data["allLostItems"]);
        console.log(listOfPins);
      });
    }, []);

    // Selected allows us to pass a location and render it as a market on the map
    const [selected, setSelected] = useState();

    const[currentLocation, setCurrentLocation] = useState(null);

    // useEffect(() => {
    //   axios.get("http://localhost:5000/locations").then((response) => {
    //     setListOfPins(response.data); // will be a list item containing arrays of latlng objects
    //   });
    // });
    useEffect(() => {
      // Fetch locations from backend
      axios.get("http://localhost:5000/locations").then((response) => {
          setListOfPins(response.data);
      }).catch(error => {
          console.error('Error fetching locations:', error);
      });

      // Get user's current location
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ lat: latitude, lng: longitude });
          },
              (error) => {
                  console.error("Error getting current location:", error);
              }
          );
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  }, []);

    if (!isLoaded) return <div>Loading...</div>;

    return (
      <APIProvider>
        <PlacesAutocomplete className="Gmaps-Searchbar" setSelected = {setSelected}/>
        <Map defaultZoom={15} defaultCenter={currentLocation || defaultPosition} mapId={"95ff34d67269854f"} className="map-container">
          {/* Render pins from the backend */}
          {listOfPins.map((pin, index) => (
                      <AdvancedMarker key={index} position={pin} onClick={() => {
                          setSelected(pin);
                          setOpen(true);
                      }}>
                          <Pin /> 
                      </AdvancedMarker>
                  ))}
                  {/* Render the current location marker */}
        {currentLocation && (
          <>
            {/* Display the "Your Location" label */}
            <AdvancedMarker position={currentLocation}>
              <InfoWindow position={{ lat: currentLocation.lat + 0.0005, lng: currentLocation.lng }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>Your Location</div>
              </InfoWindow>
              <Pin />
            </AdvancedMarker>
          </>
        )}
        {selected && open && (
          <>
            <AdvancedMarker position={selected}>
              <Pin />
            </AdvancedMarker>
            <InfoWindow disableAutoPan={false} position={selected} onCloseClick={() => setOpen(false)}>
              <p className="disable-opacity">test</p>
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
      console.log(address);
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      console.log({lat, lng});
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