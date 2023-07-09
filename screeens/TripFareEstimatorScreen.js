import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const TripFareEstimatorScreen = () => {
  const [distance, setDistance] = useState("");
  const [fare, setFare] = useState("");
  const [carType, setCarType] = useState("Car");
  const [waitHours, setWaitHours] = useState("");

  const handleEstimateFare = () => {
    // Fare calculation based on car type and wait hours
    let farePerKilometer = 0;
    switch (carType) {
      case "Bike":
        farePerKilometer = 20;
        break;
      case "Auto":
        farePerKilometer = 10;
        break;
      case "Car":
        farePerKilometer = 13.5;
        break;
      case "Wheelchair Car":
        farePerKilometer = 20;
        break;
      default:
        farePerKilometer = 15;
        break;
    }

    const calculatedFare = farePerKilometer * parseFloat(distance);
    const waitCharges = calculateWaitCharges(); // Calculate wait charges based on wait hours
    const totalFare = calculatedFare + waitCharges;
    setFare(totalFare.toFixed(2));
  };

  const calculateWaitCharges = () => {
    const waitChargesPerHour = 5; // Replace with your actual wait charges per hour
    const waitHoursFloat = parseFloat(waitHours);
    if (isNaN(waitHoursFloat)) {
      return 0;
    } else {
      return waitChargesPerHour * waitHoursFloat;
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.upperView}></View> */}
      <View style={styles.lowerView}>
        <Text style={styles.heading}>Trip Fare Estimator</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Distance (in kilometers):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
            placeholder="Enter distance"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Car Type:</Text>
          <Picker
            style={styles.input}
            selectedValue={carType}
            onValueChange={setCarType}
          >
            <Picker.Item label="Bike" value="Bike" />
            <Picker.Item label="Auto" value="Auto" />
            <Picker.Item label="Car" value="Car" />
            <Picker.Item label="Wheelchair Car" value="Wheelchair Car" />
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Wait Hours:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={waitHours}
            onChangeText={setWaitHours}
            placeholder="Enter wait hours"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleEstimateFare}>
          <Text style={styles.buttonText}>Estimate Fare</Text>
        </TouchableOpacity>
        {fare !== "" && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Estimated Fare:</Text>
            <Text style={styles.fareText}>₹ {fare}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TripFareEstimatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  upperView: {
    backgroundColor: "#b7de55",
    flex: 1,
  },
  lowerView: {
    backgroundColor: "white",
    flex: 6,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#b7de55",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#888888",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fareText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#b7de55",
  },
});
