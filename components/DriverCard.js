import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import * as Speech from 'expo-speech';

const DriverCard = (props) => {
  const { name, location, arrivalTime, rating, navigation } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{
      const thingsToSay = `Driver's name is ${name}, rating is ${rating} star, driver's current location is ${location}, estimated arrival time is ${arrivalTime}`
      Speech.speak(thingsToSay);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Entypo name="user" size={60} color="black" />
        <View>
          <Text>Driver Name : {name}</Text>
          <Text>Driver's Location : {location}</Text>
          <Text>Driver's Arrival Time : {arrivalTime}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <FontAwesome name="star" size={24} color="#ecbd00" />
          <Text style={{ fontWeight: "bold", marginLeft: 5 }}>{rating}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10, fontWeight: "bold" }}>$250.00</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              Speech.speak(`Driver ${name}, with rating ${rating} star, selected. Now click on Book to confirm booking`);
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              navigation.navigate("DriverDetailsScreen", {
                screen: "DriverDetails",
                params: {
                  name: name,
                  currentLocation: location,
                  rating: rating,
                  arrivalTime : arrivalTime
                },
              });
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    width: "85%",
    alignSelf: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#b7ed55",
    marginTop: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 10,
    borderRadius: 10,
  },
});
