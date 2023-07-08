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

import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import * as Haptics from "expo-haptics";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import * as Speech from "expo-speech";


//translation modules

import { I18n } from 'i18n-js';
import {en,hi,bn} from '../i18n'

import useStore from "../store";

const Home = ({ navigation }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [checked, setChecked] = React.useState("");

  //localization

  const i18n = new I18n();

  const { locale } = useStore((state) => ({
    locale: state.locale,
  }));

  i18n.fallbacks = true;
  i18n.translations = { en, bn };
  i18n.locale = locale;

  return (
    <ScrollView style={styles.container}>
        {/* don't use react native zoomable view it's buggy in some mobiles */}
    {/* <ReactNativeZoomableView */}  
        {/* zoomEnabled={true}
        maxZoom={2}
        minZoom={1}
        zoomStep={0.25}
        initialZoom={1}
        bindToBorders={false}
      > */}
        <Text style={styles.header}>AccessRide</Text>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setSource}
              value={source}
              placeholder={i18n.t("Pickup Location")}
              onFocus={() => {
                Speech.speak("Enter your current location");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
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
              placeholder={i18n.t("Drop Location")}
              onFocus={() => {
                Speech.speak("Enter your destination");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
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
          {i18n.t("Select Your Ride")}
        </Text>
        <View style={styles.options}>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="bike-fast" size={60} color="black" />
            <Text>{i18n.t("Bike")}</Text>
            <RadioButton
              value="bike"
              status={checked === "bike" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("bike");
                Speech.speak("Bike Selected")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <MaterialCommunityIcons name="rickshaw" size={65} color="black" />
            <Text>{i18n.t("Auto-rickshaw")}</Text>
            <RadioButton
              value="rickshaw"
              status={checked === "rickshaw" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("rickshaw");
                Speech.speak("Auto-rickshaw Selected")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            />
          </View>
        </View>
        <View style={styles.options}>
          <View style={{ alignItems: "center" }}>
            <FontAwesome name="car" size={55} color="black" />
            <Text>{i18n.t("Car")}</Text>
            <RadioButton
              value="car"
              status={checked === "car" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("car");
                Speech.speak("Four-wheeler car Selected")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <MaterialIcons name="wheelchair-pickup" size={60} color="black" />
            <Text>{i18n.t("Wheelchair")}</Text>
            {/* <Text>accessible car</Text> */}
            <RadioButton
              value="wheelchair"
              status={checked === "wheelchair" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("wheelchair");
                Speech.speak("wheelchair accessible car Selected")
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
              Speech.speak("Please enter your current location")
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            } else if (!destination.length) {
              Alert.alert("Please enter destination!");
              Speech.speak("lease enter destination!")
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            } else if (!checked.length) {
              Alert.alert("Please select your ride!");
              Speech.speak("Please select your ride!")
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            } else {
              Speech.speak("Getting all the available drivers for you")
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              );
              navigation.navigate("DriversScreen");
            }
          }}
        >
          <Text style={{ 
          fontSize: 20,
          fontWeight: "bold",

         }}>{i18n.t("Search Drivers")}</Text>
        </TouchableOpacity>
      {/* </ReactNativeZoomableView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container : {
    flex : 1,
    // marginTop : 30,
    marginBottom : 70,
    flex: 1,
    // paddingTop: 30,
    backgroundColor : 'white'
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
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    margin: 20,
    fontWeight: "bold",
  },
});

export default Home;
