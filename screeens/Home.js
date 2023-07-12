import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 

import React, { useState, useContext } from "react";
import { RadioButton } from "react-native-paper";
import * as Haptics from "expo-haptics";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import * as Speech from "expo-speech";
import Voice from "@react-native-voice/voice";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]); // Ignore log notification by message
import { LocationContext } from "../context/LocationContext";
import SourceInput from "../components/SourceInput";
import DestinationInput from '../components/DestinationInput'

//translation modules

import { I18n } from "i18n-js";
import { en, hi, bn } from "../i18n";

import useStore from "../store";

const Home = ({ navigation }) => {
  const {source, setSource, destination, setDestination} = useContext(LocationContext)
  // const [source, setSource] = useState("");
  // const [destination, setDestination] = useState("");
  const [checked, setChecked] = React.useState("");

  //localization

  const i18n = new I18n();

  const { locale } = useStore((state) => ({
    locale: state.locale,
  }));

  i18n.fallbacks = true;
  i18n.translations = { en, bn };
  i18n.locale = locale;

  // // speech-to-text
  // const [error, setError] = useState("");
  // const [isRecordingDestination, setIsRecordingDestination] = useState(false);

  // Voice.onSpeechStart = () => setIsRecordingDestination(true);
  // Voice.onSpeechEnd = () => setIsRecordingDestination(false);
  // Voice.onSpeechError = (err) => setError(err.error);
  // Voice.onSpeechResults = (destination) => setDestination(destination.value[0]);

  // const startRecording = async () => {
  //   try {
  //     await Voice.start("en-US");
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // const stopRecording = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      {/* don't use react native zoomable view it's buggy in some mobiles */}
      <ReactNativeZoomableView
      zoomEnabled={true}
        maxZoom={2}
        minZoom={1}
        zoomStep={0.25}
        initialZoom={1}
        bindToBorders={false}
      >
      <Text style={styles.header}>AccessRide</Text>
      <View style={{ alignSelf: "center" }}>
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setSource}
            value={source}
            placeholder="Pickup Location"
            onFocus={() => {
              Speech.speak("Enter your current location");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
          {/* <FontAwesome
            name="microphone"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          /> */}
          {/* <Entypo name="home" size={24} color="black" />
        </View>  */}
        <SourceInput />
        {/* <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={setDestination}
            value={destination}
            placeholder="Drop Location"
            onFocus={() => {
              Speech.speak("Enter your destination");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
          <TouchableOpacity
            onPress={isRecordingDestination ? stopRecording : startRecording}
          >
            {isRecordingDestination ? (
              <FontAwesome
                name="microphone-slash"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            ) : (
              <FontAwesome
                name="microphone"
                size={24}
                color="black"
                style={{ marginRight: 10 }}
              />
            )}
          </TouchableOpacity>
        </View> */}
        <DestinationInput/>
      </View>
      <Text style={{ alignSelf: "center", fontSize: 25, margin: 15, zIndex : -1 }}>
        Select Your Ride
      </Text>
      <View style={styles.options}>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="bike-fast" size={60} color="black" />
          <Text>Bike</Text>
          <RadioButton
            value="bike"
            status={checked === "bike" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("bike");
              Speech.speak("Bike Selected");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialCommunityIcons name="rickshaw" size={65} color="black" />
          <Text>Auto-rickshaw</Text>
          <RadioButton
            value="rickshaw"
            status={checked === "rickshaw" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("rickshaw");
              Speech.speak("Auto-rickshaw Selected");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
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
            onPress={() => {
              setChecked("car");
              Speech.speak("Four-wheeler car Selected");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialIcons name="wheelchair-pickup" size={60} color="black" />
          <Text>Wheelchair</Text>
          {/* <Text>accessible car</Text> */}
          <RadioButton
            value="wheelchair"
            status={checked === "wheelchair" ? "checked" : "unchecked"}
            onPress={() => {
              setChecked("wheelchair");
              Speech.speak("wheelchair accessible car Selected");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (!source.length) {
            Alert.alert("Please enter your current location!");
            Speech.speak("Please enter your current location");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } else if (!destination.length) {
            Alert.alert("Please enter destination!");
            Speech.speak("lease enter destination!");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } else if (!checked.length) {
            Alert.alert("Please select your ride!");
            Speech.speak("Please select your ride!");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          } else {
            Speech.speak("Getting all the available drivers for you");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            navigation.navigate("DriversScreen");
          }
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Search Drivers
        </Text>
      </TouchableOpacity>
      </ReactNativeZoomableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 70,
    flex: 1,
    // paddingTop: 30,
    backgroundColor: "white",
  },
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
    zIndex : -1
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    zIndex : -1
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    margin: 20,
    fontWeight: "bold",
  },
});

export default Home;
