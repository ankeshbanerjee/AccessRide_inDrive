import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Haptics from "expo-haptics";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const DriverDetails = ({ route, navigation }) => {
  const [feedback, setFeedback] = useState("");
  const handleFeedbackPress = () => {
    // Handle feedback button press
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("Give Feedback pressed");
  };

  const feedbacks = [
    "1. Very good",
    "2. Very helpful",
    "3. Safe driver",
    "4. Helped me to walk",
  ];

  const { name, currentLocation, rating } = route.params;

  return (
    <ScrollView style={styles.container}>
      <ReactNativeZoomableView
        zoomEnabled={true}
        maxZoom={2}
        minZoom={1}
        zoomStep={0.25}
        initialZoom={1}
        bindToBorders={true}
      >
        <View style={styles.upperview}>
          {/* <Icon name="chevron-left" style={styles.icon} /> */}
          <Image
            source={require("../assets/driver.jpg")}
            style={styles.photo}
          />
        </View>
        <View style={styles.middleview}>
          <Text style={styles.heading}>Driver Details:</Text>
          <View style={{ marginVertical: 10, alignSelf: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
            {/* <Text>Driver's Location : {currentLocation}</Text> */}
          </View>
          <View style={styles.detailsContainer}>
            <Icon name="star" style={styles.starIcon} />
            <Text style={styles.detailsText}>{rating}</Text>
          </View>
          {/* <TouchableOpacity
          style={styles.feedbackBox}
          onPress={handleFeedbackPress}
        >
          <Text style={styles.feedbackText}>Give Feedback</Text>
          <Icon name="microphone" style={styles.microphoneIcon} />
        </TouchableOpacity> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setFeedback}
              value={feedback}
              placeholder="Give Feeback"
              onFocus={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            />
            <FontAwesome
              name="microphone"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          </View>
          <Text style={styles.customerFeedbackHeading}>Customer Feedback:</Text>
          {feedbacks.map((feedback, index) => (
            <View style={styles.feedbackItem} key={index}>
              <Text style={styles.customerFeedback}>{feedback}</Text>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => {
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success
                );
                navigation.navigate("JourneyDetails");
              }}
            >
              <Text style={styles.buttonText}>Book</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.rateButton}
              onPress={() =>
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
              }
            >
              <Text style={styles.buttonText}>Rate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeZoomableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
    marginTop : 15,
    marginBottom : 80
  },
  upperview: {
    flex: 0.8,
    // backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 45,
    paddingBottom: 10,
    zIndex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 100,
    marginBottom: -60,
    zIndex: 2,
  },
  middleview: {
    flex: 8,
    // backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 10,
    marginTop: 70,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  starIcon: {
    fontSize: 32,
    color: "goldenrod",
    marginRight: 5,
  },
  detailsText: {
    fontSize: 32,
    marginTop: -5,
  },
  feedbackBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#b7ed55",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 20,
    width: 250,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  microphoneIcon: {
    fontSize: 20,
    marginLeft: 75,
  },
  customerFeedbackHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  feedbackItem: {
    alignSelf: "flex-start",
    marginLeft: 100,
  },
  customerFeedback: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 13,
    flexDirection: "row",
    justifyContent: "center",
  },
  bookButton: {
    marginTop: 20,
    backgroundColor: "#b7ed55",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 150,
  },
  rateButton: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 150,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },
  textInput: {
    width: "87%",
    padding: 10,
    paddingLeft: 15,
    fontSize: 17,
  },
  inputContainer: {
    marginTop: 20,
    padding: 5,
    width: "75%",
    borderRadius: 20,
    backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DriverDetails;
