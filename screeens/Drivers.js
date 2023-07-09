import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import DriverCard from "../components/DriverCard";
import driversData from "../assets/data/driversData";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';

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
        ListHeaderComponent={() => {
            return (
              <View style={{alignSelf : 'center', marginTop : 10}}>
                <Text style={{fontSize : 15}}>Confused about the standard fare?</Text>
                <TouchableOpacity onPress={()=>{
                  Speech.speak("Trip fare estimator")
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                  navigation.navigate("TripFareEstimatorScreen")
                  }}>
                  <Text style={{fontWeight : 'bold', fontSize : 15, textDecorationLine: 'underline', color : '#094f00'}}>Click Here to get the estimated fare</Text>
                </TouchableOpacity>
              </View>
            );
        }}
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
    // marginBottom: 80,
    flex: 1,
    paddingBottom: 75,
    backgroundColor: "white",
  },
});

export default Drivers;
