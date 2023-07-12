import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceLat, setSourceLat] = useState(null);
  const [sourceLng, setSourceLng] = useState(null);
  const [destLat, setDestLat] = useState(null);
  const [destLng, setDestLng] = useState(null);

  return (
    <LocationContext.Provider
      value={{
        source,
        setSource,
        destination,
        setDestination,
        sourceLat,
        sourceLng,
        setSourceLat,
        setSourceLng,
        destLat,
        destLng,
        setDestLat,
        setDestLng,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
