import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Voice from "@react-native-community/voice";

const drivers = [
  {
    id: 1,
    photo: require("../../assets/driver.jpg"),
    name: "Arjya",
    location: "Location 1",
    arrivingTime: "10 mins",
    rating: 5,
    earnings: 250,
  },
  {
    id: 2,
    photo: require("../../assets/driver.jpg"),
    name: "Devleena",
    location: "Location 2",
    arrivingTime: "15 mins",
    rating: 4,
    earnings: 200,
  },
  {
    id: 3,
    photo: require("../../assets/driver.jpg"),
    name: "Ankesh",
    location: "Location 3",
    arrivingTime: "20 mins",
    rating: 4,
    earnings: 200,
  },
  {
    id: 4,
    photo: require("../../assets/driver.jpg"),
    name: "Debayan",
    location: "Location 3",
    arrivingTime: "30 mins",
    rating: 4,
    earnings: 200,
  },
  // Add more driver data as needed
];

const Leaderboard = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState(drivers);

  useEffect(() => {
    Voice.onSpeechResults = handleVoiceResults; // Register the event handler
    return () => {
      Voice.destroy().then(Voice.removeAllListeners); // Clean up the event listener
    };
  }, []);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  const startSpeechRecognition = async () => {
    try {
      await Voice.start("en-US"); // Start voice recognition
    } catch (error) {
      console.error("Error starting voice recognition", error);
    }
  };

  const handleVoiceResults = (event) => {
    const { value } = event.value[0]; // Extract the recognized voice input
    setSearchInput(value);
    const filtered = drivers.filter((driver) =>
      driver.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  const stopSpeechRecognition = async () => {
    try {
      await Voice.stop(); // Stop voice recognition
    } catch (error) {
      console.error("Error stopping voice recognition", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.upperview}>
        {/* <Icon name="chevron-left" style={styles.icon} /> */}
        <View style={styles.searchBar}>
          <Icon name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Drivers"
            placeholderTextColor="#A9A9A9"
            value={searchInput}
            onChangeText={handleSearch}
          />
          <TouchableOpacity
            style={styles.microphoneButton}
            onPress={startSpeechRecognition}
          >
            <Icon name="microphone" style={styles.microphoneIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.middleview}>
        {filteredDrivers.map((driver) => (
          <View style={styles.driverContainer} key={driver.id}>
            <Image source={driver.photo} style={styles.driverPhoto} />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverLocation}>{driver.location}</Text>
              <Text style={styles.driverArrivingTime}>
                {driver.arrivingTime}
              </Text>
            </View>
            <View style={styles.driverStats}>
              <View style={styles.driverRatingContainer}>
                <Icon name="star" style={styles.starIcon} />
                <Text style={styles.driverRating}>{driver.rating}</Text>
              </View>
              <Text style={styles.driverEarnings}>${driver.earnings}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.lowerview}>
        <Text style={styles.checkLeaderboardText}>Check Leaderboard</Text>
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom : 75
  },
  upperview: {
    // flex: 1.5,
    // backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "flex-end",
    // paddingLeft: 10,
    // paddingBottom: 10,
    // zIndex: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    alignItems: "center",
    // paddingLeft: 10,
    // paddingRight: 10,
    // marginLeft: 20,
    // marginRight: 50,
    // marginBottom: -30,
    marginHorizontal : 20,
    marginVertical : 10,
    paddingHorizontal : 10,
    height: 40,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: "#000",
  },
  microphoneButton: {
    padding: 5,
  },
  microphoneIcon: {
    fontSize: 24,
    color: "#000",
  },
  middleview: {
    flex: 6,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal : 20
  },
  driverContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
  },
  driverPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
    marginRight: 20,
    marginLeft: 50,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  driverLocation: {
    fontSize: 14,
    color: "#777",
  },
  driverArrivingTime: {
    fontSize: 14,
    color: "#777",
  },
  driverStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  starIcon: {
    fontSize: 18,
    color: "gold",
    marginRight: 5,
    marginBottom: 10,
  },
  driverRating: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  driverEarnings: {
    fontSize: 14,
    color: "green",
    marginLeft: -25,
    marginTop: 30,
  },
  lowerview: {
    backgroundColor: "#b7ed55",
    justifyContent: "center",
    alignItems: "center",
    // borderTopLeftRadius: 20,
    // borderTopEndRadius: 20,
    borderRadius : 20,
    marginHorizontal : 20,
    padding : 20,
  },
  checkLeaderboardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Leaderboard;
