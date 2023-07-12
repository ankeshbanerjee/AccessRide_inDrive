import React, { useEffect, useRef, useContext } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { LocationContext } from "../context/LocationContext";

export default function JourneyDetailsMap({coord}) {
  const sourceName = useContext(LocationContext).source;
  const destinationName = useContext(LocationContext).destination;

  const mapRef = useRef();
  const {sourceLat, sourceLng, destLat, destLng} = coord;
  const source = {
    latitude: sourceLat,
    longitude: sourceLng,
  };

  const destination = {
    latitude: destLat,
    longitude: destLng,
  };

  // const markers = [
  //   { id: 1, ...source },
  //   { id: 2, ...destination },
  // ];

  // useEffect(() => {
  //   if (mapRef.current && markers.length > 0) {
  //     const coordinates = markers.map((marker) => ({
  //       latitude: marker.latitude,
  //       longitude: marker.longitude,
  //     }));
  //     mapRef.current.fitToCoordinates(coordinates, {
  //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //       animated: true,
  //     });
  //   }
  // }, []);

  const initialRegion = {
    latitude: (source.latitude + destination.latitude) / 2, // Set the initial region to be centered between source and destination
    longitude: (source.longitude + destination.longitude) / 2,
    latitudeDelta:
      Math.abs(source.latitude - destination.latitude) * 1.7, // Adjust the zoom level based on the distance between source and destination
    longitudeDelta:
      Math.abs(source.longitude - destination.longitude) * 1.7,
  };


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        // initialRegion={{
        //   latitude: source.latitude,
        //   longitude: source.longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        initialRegion={initialRegion}
        style={styles.map}
      >
        <Marker
          coordinate={source}
          title={sourceName}
          key="Source"
          description="This is the source"
          pinColor="green"
        />
        <Marker
          coordinate={destination}
          title={destinationName}
          key="Destination"
          description="This is the destination"
          pinColor="red"
        />

        <Polyline
          coordinates={[source, destination]}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={6}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '45%'
  },
  map: {
    width: "95%",
    height: '100%',
    alignSelf: "center",
  },
});
