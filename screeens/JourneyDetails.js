import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import JourneyDetailsMap from "../components/JourneyDetailsMap";
import Timer from "../components/Timer";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import { LocationContext } from "../context/LocationContext";

const JourneyDetails = ({ route, navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("JourneyDetails", {
        screen: "Inride"
      });
    }, 10000);
  }, [navigation]);

  // const getTime = (time) => {
  //   const string1 = time;
  //   const string2 = " minutes";
  //   const result = [...string1].filter((c) => !string2.includes(c)).join("");
  //   const number = parseInt(result);
  //   return number;
  // };

  const { source, destination } = useContext(LocationContext);
  const [sourceLat, setSourceLat] = useState(null);
  const [sourceLng, setSourceLng] = useState(null);
  const [destLat, setDestLat] = useState(null);
  const [destLng, setDestLng] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCoord = async () => {
    setLoading(true);
    let responseSource = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${source}&key=6dfb23223ce04bffbe1598a65fb33d93`
    );
    let dataSource = await responseSource.json();
    setSourceLat(dataSource.results[0].geometry.lat);
    setSourceLng(dataSource.results[0].geometry.lng);
    let responseDest = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=6dfb23223ce04bffbe1598a65fb33d93`
    );
    let dataDest = await responseDest.json();
    setLoading(false);
    setDestLat(dataDest.results[0].geometry.lat);
    setDestLng(dataDest.results[0].geometry.lng);
  };

  useEffect(() => {
    getCoord();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 25,
        }}
      >
        Wish you a safe journey!
      </Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#00ff00"
          style={{ paddingVertical: 20 }}
        />
      ) : (
        <JourneyDetailsMap coord={{ sourceLat, sourceLng, destLat, destLng }} />
      )}
      <Text style={{ fontSize: 22, alignSelf: "center", marginVertical: 20 }}>
        Amount Payable : <Text style={{ fontWeight: "bold" }}>$250</Text>
      </Text>
      <Timer time={1 / 6} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 20 }}>Contact Driver: </Text>
        <Ionicons name="md-call" size={24} color="black" />
        <TouchableOpacity
          selectable
          style={{ fontSize: 20, fontWeight: "bold" }}
          onPress={() => {
            if (Platform.OS === "android") Linking.openURL(`tel:${9007361795}`);
            else Linking.openURL(`telprompt:${9007361795}`);
          }}
        >
          <Text>0123456789</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: "#d9d9d9" }]}
          onPress={() => {
            Speech.speak("Are you sure to cancel Booking?");
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            Alert.alert("Cancel Ride", "Are you sure to cancel booking?", [
              {
                text: "YES  ",
                onPress: () => {
                  Speech.speak("Booking Canceled!");
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success
                  );
                  navigation.navigate("HomeScreen", { screen: "Home" });
                },
              },
              {
                text: "NO",
                onPress: () =>
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
              },
            ]);
          }}
        >
          <Text style={{ fontSize: 15 }}>Cancel Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            navigation.goBack();
          }}
        >
          <Text style={{ fontSize: 15 }}>See Driver's Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JourneyDetails;

const styles = StyleSheet.create({
  container: {
    // marginTop : 15,
    flex: 1,
    paddingBottom: 80,
    paddingTop: 15,
    backgroundColor: "white",
  },
  btn: {
    alignSelf: "center",
    backgroundColor: "#b7ed55",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
});
