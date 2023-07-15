import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import * as Haptics from "expo-haptics";
import * as Speech from "expo-speech";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import { LocationContext } from "../context/LocationContext";

const sourceInput = () => {
  const {
    destination,
    setDestination,
    destLat,
    destLng,
    setDestLat,
    setDestLng,
  } = useContext(LocationContext);
  const [destinations, setDestinations] = useState([]);
  const [destinationSelected, setDestinationSelected] = useState(true);

  const handleSelection = (place) => {
    setDestLat(place.geometry.lat);
    setDestLng(place.geometry.lng);
    setDestination(place.formatted);
    setDestinationSelected(false);
  };

  const Suggestion = ({ place }) => {
    return (
      <TouchableOpacity
        style={styles.suggestion}
        onPress={() => handleSelection(place)}
      >
        <Entypo name="location-pin" size={24} color="black" />
        <Text style={{ width: "95%" }}>{place.formatted}</Text>
      </TouchableOpacity>
    );
  };

  const fetchSources = async () => {
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=6dfb23223ce04bffbe1598a65fb33d93`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    setDestinations(JSON.parse(JSON.stringify(data.results)));
  };

  useEffect(() => {
    fetchSources();
  }, [destination]);

  // speech-to-text
  const [error, setError] = useState("");
  const [isRecordingDestination, setIsRecordingDestination] = useState(false);

  Voice.onSpeechStart = () => setIsRecordingDestination(true);
  Voice.onSpeechEnd = () => setIsRecordingDestination(false);
  Voice.onSpeechError = (err) => setError(err.error);
  Voice.onSpeechResults = (destination) => setDestination(destination.value[0]);

  const startRecording = async () => {
    try {
      await Voice.start("en-US");
    } catch (err) {
      setError(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <View style={styles.inputContainer}>
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
      </View>
      {destinationSelected && (
        <View
          style={{
            // height: 470,
            width: "97.5%",
            position: "absolute",
            top: 151,
            zIndex: 99,
            alignSelf: "center",
          }}
        >
          {/* <FlatList
              data={sources}
              renderItem={({ item }) => <Suggestion place={item} />}
              keyExtractor={(item) => item.geometry.lat}
            /> */}
            <ScrollView>
            {destinations.map((item) => (
              <Suggestion place={item} key={item.geometry.lat} />
            ))}
            </ScrollView>
        </View>
      )}
    </>
  );
};

export default sourceInput;

const styles = StyleSheet.create({
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
  suggestion: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderTopWidth: 0,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
