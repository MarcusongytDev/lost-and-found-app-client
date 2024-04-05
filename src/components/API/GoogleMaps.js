import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

export default function GoogleMaps() {
  const position = { lat: 103.8198, lng: 1.3521 };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey="AIzaSyB5yzIMiOUagFda-20MnNBruQAGgdsVPfc">
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={"95ff34d67269854f"}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
  