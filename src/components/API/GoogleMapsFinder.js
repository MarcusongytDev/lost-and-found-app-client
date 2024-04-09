import { useEffect, useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
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
import './GoogleMapsFinder.css'

export default function GoogleMaps({setlocation}) {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc",
    libraries: ["places"],
  });

  

  const [open, setOpen] = useState(false);
  const position = { lat: 1.349, lng: 103.739 }
  // Get places library in google maps api

  // Selected allows us to pass a location and render it as a market on the map
  const [selected, setSelected] = useState(false);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <APIProvider>
      <PlacesAutocomplete className="Gmaps-Searchbar" setSelected = {setSelected}/>
      {/* <button type="submit" onClick={() => setlocation(selected)}></button> */}
      <Map defaultZoom={15} defaultCenter={position} mapId={"95ff34d67269854f"} className="map-container">
        {selected && (
          <>
            <AdvancedMarker position={selected}>
              <Pin />
            </AdvancedMarker>
            <InfoWindow disableAutoPan={false} position={selected} ><p>Selected Location</p>{setlocation(selected)}</InfoWindow>
          </>
        )
        }
      </Map>
    </APIProvider>
  );
}

const PlacesAutocomplete = ({setSelected}, {setlocation}) =>{
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
    console.log(results);
    const {lat, lng} = await getLatLng(results[0]);
    setSelected({lat, lng});
    // setlocation({lat, lng});
  }
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        disabled={!ready} 
        className="combobox-input-finder" 
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