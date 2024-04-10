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
import './GoogleMapsFinder.css';

// Define the libraries array outside of the component
const libraries = ["places"];

export default function GoogleMaps({setlocation}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc",
    libraries: ["places"], // Pass the libraries array
  });
  const [open, setOpen] = useState(true);
  const position = { lat: 1.349, lng: 103.739 }

  const [selected, setSelected] = useState(false);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <APIProvider>
      <PlacesAutocomplete className="Gmaps-Searchbar" setSelected = {setSelected} onClick={() => {setlocation(selected)}}/>
      {setlocation(selected)}
      {/* <button onClick={() => {setlocation(selected)}}></button> */}
      <Map defaultZoom={15} defaultCenter={position} mapId={"95ff34d67269854f"} className="map-container" onClick={() => setOpen(true)}>
        {selected && (
          <>
            <AdvancedMarker position={selected}>
              <Pin />
              {open && <InfoWindow disableAutoPan={false} position={selected} onCloseClick={()=>{setOpen(false)}}><p>Selected Location</p></InfoWindow>}
            </AdvancedMarker>
            
          </>
        )
        }
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
