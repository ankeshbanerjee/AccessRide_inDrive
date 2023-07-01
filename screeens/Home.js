import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [checked, setChecked] = React.useState("");

  return (
    <View style={{ marginTop: 55 }}>
      <Text style={styles.header}>AccessRide</Text>
      <View style={{ alignSelf: "center" }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setSource}
            value={source}
            placeholder="Your location"
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
          />
          <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </View>
      </View>
      <Text style={{ alignSelf: "center", fontSize: 25, marginTop: 70 }}>
        Select Your Ride
      </Text>
      <View style={styles.options}>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="bike-fast" size={40} color="black" />
          <RadioButton
            value="bike"
            status={checked === "bike" ? "checked" : "unchecked"}
            onPress={() => setChecked("bike")}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="rickshaw" size={40} color="black" />
          <RadioButton
            value="rickshaw"
            status={checked === "rickshaw" ? "checked" : "unchecked"}
            onPress={() => setChecked("rickshaw")}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <FontAwesome name="car" size={40} color="black" />
          <RadioButton
            value="car"
            status={checked === "car" ? "checked" : "unchecked"}
            onPress={() => setChecked("car")}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialIcons name="wheelchair-pickup" size={40} color="black" />
          <RadioButton
            value="wheelchair"
            status={checked === "wheelchair" ? "checked" : "unchecked"}
            onPress={() => setChecked("wheelchair")}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => console.log("pressed")}
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
    margin: 20,
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    margin: 40,
    fontWeight: "bold",
  },
});

export default Home;
