import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import * as Speech from "expo-speech";

const DriverCard = (props) => {
  const { name, location, arrivalTime, rating, navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [negotiateValue, setNegotiateValue] = useState("");

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        const thingsToSay = `Driver's name is ${name}, rating is ${rating} star, driver's current location is ${location}, estimated arrival time is ${arrivalTime}`;
        Speech.speak(thingsToSay);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Entypo name="user" size={60} color="black" />
        <View>
          <Text>Driver Name: {name}</Text>
          <Text>Driver's Location: {location}</Text>
          <Text>Driver's Arrival Time: {arrivalTime}</Text>
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
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Speech.speak("Negotiate");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            setModalVisible(true);
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Negotiate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Speech.speak("Apply Coupon");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.navigate("InclusivePromotionsScreen");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Apply coupon</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Speech.speak(
              `Driver ${name}, with rating ${rating} star, selected. Now click on Book to confirm booking`
            );
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.navigate("DriverDetailsScreen", {
              screen: "DriverDetails",
              params: {
                name: name,
                currentLocation: location,
                rating: rating,
                arrivalTime: arrivalTime,
              },
            });
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="times" size={24} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Offer your price"
              keyboardType="numeric"
              onChangeText={(text) => setNegotiateValue(text)}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                // Handle the submission of the negotiated value here
                // You can access the negotiated value using the `negotiateValue` state variable
                Speech.speak("Your offered price is sent to the driver");
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
                setModalVisible(false);
                Alert.alert("Sent to the driver");
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: 200,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#b7ed55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: "bold",
    // color: "#fff",
    color: "black",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
});
