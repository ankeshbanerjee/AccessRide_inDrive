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
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LocationContext } from "../context/LocationContext";
import * as Location from "expo-location";

const sourceInput = () => {
  const {
    source,
    setSource,
    sourceLat,
    sourceLng,
    setSourceLat,
    setSourceLng,
  } = useContext(LocationContext);
  const [sources, setSources] = useState([]);
  const [sourceSelected, setSourceSelected] = useState(true);

  const handleSelection = (place) => {
    setSourceLat(place.geometry.lat);
    setSourceLng(place.geometry.lng);
    setSource(place.formatted);
    setSourceSelected(false);
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
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${source}&key=6dfb23223ce04bffbe1598a65fb33d93`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    setSources(JSON.parse(JSON.stringify(data.results)));
  };

  useEffect(() => {
    fetchSources();
  }, [source]);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    Speech.speak("Getting your current location");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setSourceLat(location.coords.latitude);
    setSourceLng(location.coords.longitude);
    let promise = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${sourceLat}+${sourceLng}&key=6dfb23223ce04bffbe1598a65fb33d93`
    );
    let data = await promise.json();
    setSource(data.results[0].formatted);
    console.log(source);
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSource}
          value={source}
          placeholder="Pickup Location"
          onFocus={() => {
            Speech.speak("Enter your current location");
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // source.length ? setSourceSelected(true) : setSourceSelected(false);
            setSourceSelected(true);
          }}
        />
        <TouchableOpacity onPress={getLocation}>
          <MaterialIcons name="my-location" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {sourceSelected && (
        <View
          style={{
            // height: 150,
            width: "97%",
            position: "absolute",
            top: 65,
            zIndex: 99,
            alignSelf: "center",
          }}
        >
          {/* <FlatList
            data={sources}
            renderItem={({ item }) => <Suggestion place={item} />}
            keyExtractor={(item) => item.geometry.lat}
          /> */}
          {sources.map((item) => (
            <Suggestion place={item} key={item.geometry.lat} />
          ))}
        </View>
      )}
    </>
  );
};

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

export default sourceInput;
