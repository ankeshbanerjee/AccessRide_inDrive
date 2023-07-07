import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DriverCard from "../components/DriverCard";
import driversData from "../assets/data/driversData";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const Drivers = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ReactNativeZoomableView
        zoomEnabled={true}
        maxZoom={2}
        minZoom={1}
        zoomStep={0.25}
        initialZoom={1}
        bindToBorders={true}
      >
        <FlatList
          data={driversData}
          renderItem={({ item }) => (
            <DriverCard
              name={item.name}
              location={item.location}
              arrivalTime={item.arrivalTime}
              rating={item.rating}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 75,
    backgroundColor : 'white'
  },
});

export default Drivers;
