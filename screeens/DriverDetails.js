import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const DriverDetails = ({navigation}) => {
  const handleFeedbackPress = () => {
    // Handle feedback button press
    console.log("Give Feedback pressed");
  };

  const feedbacks = [
    "1. Very good",
    "2. Very helpful",
    "3. Safe driver",
    "4. Helped me to walk",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.upperview}>
        {/* <Image source={require("../assets/driver.jpg")} style={styles.photo} /> */}
      </View>
      <View style={styles.middleview}>
        <Text style={styles.heading}>Driver Details:</Text>
        <View style={styles.detailsContainer}>
          <Icon name="star" style={styles.starIcon} />
          <Text style={styles.detailsText}>5</Text>
        </View>
        <TouchableOpacity
          style={styles.feedbackBox}
          onPress={handleFeedbackPress}
        >
          <Text style={styles.feedbackText}>Give Feedback</Text>
          <Icon name="microphone" style={styles.microphoneIcon} />
        </TouchableOpacity>
        <Text style={styles.customerFeedbackHeading}>Customer Feedback:</Text>
        {feedbacks.map((feedback, index) => (
          <View style={styles.feedbackItem} key={index}>
            <Text style={styles.customerFeedback}>{feedback}</Text>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.bookButton} onPress={()=>navigation.navigate("JourneyDetails")}>
            <Text style={styles.buttonText}>Book</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.buttonText}>Rate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  upperview: {
    flex: 1.5,
    backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 10,
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
    backgroundColor: "white",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 75,
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
    marginTop: 20,
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
});

export default DriverDetails;
