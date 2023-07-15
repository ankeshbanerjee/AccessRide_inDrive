import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as Linking from 'expo-linking';

const EmergencyButtonScreen = ({route}) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleEmergencyButtonPress = () => {
    // Perform actions when the emergency button is pressed
    setIsButtonPressed(true);
    // Send distress signals to emergency contacts and police station
    // sendDistressSignals();
    Linking.openURL(`tel:${route.params.sos}`)
  };

  const sendDistressSignals = () => {
    // Simulating distress signal dispatch
    setIsButtonPressed(true);

    // Simulating sending distress signals to emergency contacts and police station
    // setTimeout(() => {
    //   Alert.alert("Help is on the way!", "Distress signals sent successfully.");
    // }, 2000);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emergency Assistance</Text>
      <TouchableOpacity
        style={[styles.button, isButtonPressed && styles.buttonPressed]}
        onPress={handleEmergencyButtonPress}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableOpacity>
      <Text style={styles.instructions}>
        Press and hold the button for 3 seconds to send distress signals to your
        emergency contacts and the nearest police station.
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  buttonPressed: {
    backgroundColor: "darkred",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  instructions: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginBottom: 20,
  },
};

export default EmergencyButtonScreen;
