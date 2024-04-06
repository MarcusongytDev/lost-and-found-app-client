import { useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  Pin,
  InfoWindow,
  useMap,
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

  if (!isLoaded) return <div>Loading...</div>;
  return <GoogleMap />;
}


function GoogleMap() {
  const [open, setOpen] = useState(false);
  const position = { lat: 1.349, lng: 103.739 }
  // Get places library in google maps api

  // Selected allows us to pass a location and render it as a market on the map
  const [selected, setSelected] = useState({ lat: 1.349, lng: 103.739 });
  const map = useMap();

  return (
    <APIProvider>
      <PlacesAutocomplete setSelected = {setSelected}/>
      <Map defaultZoom={14} defaultCenter={selected} mapId={"95ff34d67269854f"} className="map-container">
        <AdvancedMarker position={position} onClick={() => setOpen(true)}>
          <Pin
            background={"grey"}
            borderColor={"green"}
            glyphColor={"purple"}
          />
        </AdvancedMarker>

        {open && (
          <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
            <p>Test</p>
          </InfoWindow>
        )}
        {selected && <Marker position={selected} />}
      </Map>
    </APIProvider>
  );
}

const PlacesAutocomplete = ({setSelected, setPosition}) =>{
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