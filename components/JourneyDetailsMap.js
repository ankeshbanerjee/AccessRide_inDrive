import React, { useEffect, useRef } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function JourneyDetailsMap() {
  const mapRef = useRef();

  const source = {
    latitude: 22.975084,
    longitude: 88.434509,
  };

  const destination = {
    latitude: 22.5726,
    longitude: 88.3639,
  };

  const markers = [
    { id: 1, ...source },
    { id: 2, ...destination },
  ];

  useEffect(() => {
    if (mapRef.current && markers.length > 0) {
      const coordinates = markers.map((marker) => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: source.latitude,
          longitude: source.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={source}
          title="Source"
          key="Source"
          description="This is the source"
        />
        <Marker
          coordinate={destination}
          title="Destination"
          key="Destination"
          description="This is the destination"
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
