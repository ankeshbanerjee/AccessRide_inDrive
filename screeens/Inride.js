import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Share,
  ClipboardStatic,
  ToastAndroid
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LocationContext } from "../context/LocationContext";
import * as Clipboard from 'expo-clipboard';


const Inride = ({ navigation }) => {
  const { sourceLat, sourceLng, destLat, destLng, source, destination } =
    useContext(LocationContext);

  const sourceLocation = {
    latitude: sourceLat, // Latitude of the source location
    longitude: sourceLng, // Longitude of the source location
  };

  const destinationLocation = {
    latitude: destLat, // Latitude of the destination location
    longitude: destLng, // Longitude of the destination location
  };

  const initialRegion = {
    latitude: (sourceLocation.latitude + destinationLocation.latitude) / 2, // Set the initial region to be centered between source and destination
    longitude: (sourceLocation.longitude + destinationLocation.longitude) / 2,
    latitudeDelta:
      Math.abs(sourceLocation.latitude - destinationLocation.latitude) * 1.7, // Adjust the zoom level based on the distance between source and destination
    longitudeDelta:
      Math.abs(sourceLocation.longitude - destinationLocation.longitude) * 1.7,
  };

  const currentLocation = {
    latitude: 22.8309, // Latitude of the current location
    longitude: 88.4422, // Longitude of the current location
  };

  const remainingTime = "10 minutes"; // Remaining time to reach the destination

  const [customPhrase, setCustomPhrase] = useState("");
  const [customPhrases, setCustomPhrases] = useState([
    "Please wait a moment, I need to secure my seatbelt",
    "Could you please lower the volume of music?",
  ]);

  const handleAddPhrase = () => {
    if (customPhrase) {
      setCustomPhrases([...customPhrases, customPhrase]);
      setCustomPhrase("");
    }
  };

  const handleDeletePhrase = (index) => {
    const updatedPhrases = [...customPhrases];
    updatedPhrases.splice(index, 1);
    setCustomPhrases(updatedPhrases);
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    // if (message) {
    //   setMessages([...messages, message]);
    //   setMessage("");
    // }
    navigation.navigate("ChatScreen");
  };

  const handleAddPhraseToMessage = async (phrase) => {
    // setMessage((prevMessage) => prevMessage + " " + phrase);
    await Clipboard.setStringAsync(phrase);
    ToastAndroid.show('Message copied to clipboard', ToastAndroid.SHORT);
  };

  const shareRideDetails = async () => {
    try {
      const shareOptions = {
        title: "Share Ride Details",
        message: "I'm sharing the ride details with you.",
        url: "https://example.com/ride-details", // Replace with the actual ride details URL
      };

      const result = await Share.share(shareOptions);

      if (result.action === Share.sharedAction) {
        // Share was successful
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Share was dismissed/cancelled
      }
    } catch (error) {
      console.error("Error sharing ride details:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.lowerView}>
          <MapView style={styles.map} initialRegion={initialRegion}>
            <Marker
              coordinate={sourceLocation}
              pinColor="green"
              key="currentLocation"
              title={source}
              description="Current Location"
            />
            <Marker
              coordinate={destinationLocation}
              pinColor="red"
              key="destination"
              title={destination}
              description="Destination"
            />
            <Polyline
              coordinates={[sourceLocation, destinationLocation]}
              strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                "#7F0000",
                "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
                "#B24112",
                "#E5845C",
                "#238C23",
                "#7F0000",
              ]}
              strokeWidth={6}
            />
          </MapView>
          <View style={styles.detailsContainer}>
            <View
              style={{
                width: "100%",
                alignSelf: "center",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                paddingBottom: 10,
              }}
            >
              <Text style={styles.currentLocationText}>
                Current Location: Barrackpore
              </Text>
              <Text style={styles.remainingTimeText}>
                Remaining Time: {remainingTime}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#b7ed55",
                alignSelf: "center",
                flexDirection: "row",
                padding: 15,
                borderRadius: 15,
                marginTop: 15,
                alignItems: "center",
              }}
              onPress={shareRideDetails}
            >
              <Text
                style={{ fontSize: 17, marginRight: 5, fontWeight: "bold" }}
              >
                Share your ride details
              </Text>
              <Entypo name="share" size={20} color="black" />
            </TouchableOpacity>
            <ScrollView style={styles.scrollView}>
              <View style={styles.sectionContainer}>
                <ScrollView
                  contentContainerStyle={styles.tagContainer}
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.heading}>Commonly Used Phrases</Text>
                  <ScrollView>
                    <View style={styles.tagContainer}>
                      {customPhrases.map((phrase, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.tag}
                          onPress={() => handleAddPhraseToMessage(phrase)}
                        >
                          <Text style={styles.tagText}>{phrase}</Text>
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeletePhrase(index)}
                          >
                            <Text style={styles.deleteButtonText}>x</Text>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>

                  <View style={styles.customPhraseContainer}>
                    <TextInput
                      style={styles.customPhraseInput}
                      placeholder="Enter custom phrase"
                      value={customPhrase}
                      onChangeText={(text) => setCustomPhrase(text)}
                    />
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={handleAddPhrase}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
                {/* <Text style={styles.heading}>Ask Your Driver</Text>
                <View style={styles.messagingContainer}>
                  <ScrollView>
                    {messages.map((msg, index) => (
                      <Text key={index} style={styles.messageText}>
                        {msg}
                      </Text>
                    ))}
                  </ScrollView>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.messageInput}
                      placeholder="Type a message..."
                      value={message}
                      onChangeText={(text) => setMessage(text)}
                    />
                    <TouchableOpacity
                      style={styles.sendButton}
                      onPress={handleSendMessage}
                    >
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View> */}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#b7ed55",
                    alignSelf: "center",
                    flexDirection: "row",
                    padding: 15,
                    borderRadius: 15,
                    marginTop: 15,
                    alignItems: "center",
                  }}
                  onPress={handleSendMessage}
                >
                  <Text
                    style={{ fontSize: 17, marginRight: 5, fontWeight: "bold" }}
                  >
                    Ask Your Driver
                  </Text>
                  <Ionicons name="chatbubbles-sharp" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 75,
  },
  map: {
    flex: 1,
    height: 200,
    margin: 10,
  },
  lowerView: {
    flex: 3,
    backgroundColor: "white",
    // paddingBottom: 75,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  currentLocationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  remainingTimeText: {
    fontSize: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  tagContainer: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 14,
    marginRight: 6,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  customPhraseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    width: "100%", // Add this line
  },

  customPhraseInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#b7de55",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  messagingContainer: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    backgroundColor: "#f0f0f0",
    padding: 8,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#b7de55",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Inride;
