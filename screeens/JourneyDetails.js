import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
import JourneyDetailsMap from "../components/JourneyDetailsMap";
import Timer from "../components/Timer";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

const JourneyDetails = ({ route, navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("JourneyDetails", {screen : "Inride"});
    }, 10000);
  }, [navigation])
  
  const getTime = (time) => {
    const string1 = time;
    const string2 = " minutes";
    const result = [...string1].filter((c) => !string2.includes(c)).join("");
    const number = parseInt(result);
    return number;
  };
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
      <JourneyDetailsMap />
      <Text style={{ fontSize: 22, alignSelf: "center", marginVertical: 20 }}>
        Amount Payable : <Text style={{ fontWeight: "bold" }}>$250</Text>
      </Text>
      <Timer time={1/6} />
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
        <TouchableOpacity selectable style={{ fontSize: 20, fontWeight: "bold" }}
        onPress={() => {
          if(Platform.OS === 'android')
            Linking.openURL(`tel:${9007361795}`);
          else
            Linking.openURL(`telprompt:${9007361795}`);
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
