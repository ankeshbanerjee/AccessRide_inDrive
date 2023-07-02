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
          marginTop : 15
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
          <Text style={{ fontWeight: "bold", marginLeft : 5 }}>{rating}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 10, fontWeight: "bold" }}>$250.00</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("DriverDetails")}
          >
            <Text style={{ fontWeight: "bold" }}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
