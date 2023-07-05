import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import * as Haptics from "expo-haptics";

const Home = ({ navigation }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [checked, setChecked] = React.useState("");

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={styles.header}>AccessRide</Text>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.inputContainer} >
          <TextInput
            style={styles.textInput}
            onChangeText={setSource}
            value={source}
            placeholder="Your location"
            onFocus = {()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          />
          <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setDestination}
            value={destination}
            placeholder="Where do you want to go?"
            onFocus = {()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          />
          <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
      <Text style={{ alignSelf: "center", fontSize: 25, margin: 15 }}>
        Select Your Ride
      </Text>
      <View style={styles.options}>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="bike-fast" size={60} color="black" />
          <Text>Bike</Text>
          <RadioButton
            value="bike"
            status={checked === "bike" ? "checked" : "unchecked"}
            onPress={() => {setChecked("bike"); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="rickshaw" size={65} color="black" />
          <Text>Auto-rickshaw</Text>
          <RadioButton
            value="rickshaw"
            status={checked === "rickshaw" ? "checked" : "unchecked"}
            onPress={() => {setChecked("rickshaw"); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}
          />
        </View>
      </View>
      <View style={styles.options}>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="car" size={55} color="black" />
          <Text>Car</Text>
          <RadioButton
            value="car"
            status={checked === "car" ? "checked" : "unchecked"}
            onPress={() => {setChecked("car"); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialIcons name="wheelchair-pickup" size={60} color="black" />
          <Text>Wheelchair</Text>
          <Text>accessible car</Text>
          <RadioButton
            value="wheelchair"
            status={checked === "wheelchair" ? "checked" : "unchecked"}
            onPress={() => {setChecked("wheelchair"); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!source.length) {
            Alert.alert("Please enter source!");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          } else if (!destination.length) {
            Alert.alert("Please enter destination!");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          } else if (!checked.length) {
            Alert.alert("Please select your ride!");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.navigate("DriversScreen");
          }
        }}
      >
        <Text style={{ fontSize: 20 }}>Search Drivers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "87%",
    padding: 10,
    paddingLeft: 15,
    fontSize: 17,
  },
  inputContainer: {
    margin: 10,
    padding: 10,
    width: "93%",
    borderRadius: 20,
    backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "center",
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    margin: 20,
    fontWeight: "bold",
  },
});

export default Home;
