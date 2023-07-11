import React, { createContext, useState } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <LocationContext.Provider value={{ source, setSource, destination, setDestination }}>
      {children}
    </LocationContext.Provider>
  );
};
