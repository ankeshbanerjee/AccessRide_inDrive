import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";

const DriverCard = (props) => {
  const { name, location, arrivalTime, rating, navigation } = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Entypo name="user" size={40} color="black" />
        <View>
          <Text>Driver Name : {name}</Text>
          <Text>Location : {location}</Text>
          <Text>Arrival Time : {arrivalTime}</Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <FontAwesome name="star" size={24} color="#ecbd00" />
            <Text>{rating}</Text>
          </View>
          <Text>$250.00</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('DriverDetails')}>
        <Text style={{ fontWeight: "bold" }}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DriverCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
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
    marginTop: 10,
  },
});
