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
import { Entypo } from "@expo/vector-icons";
import { LocationContext } from "../context/LocationContext";

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
        <Text style={{width : '95%'}}>{place.formatted}</Text>
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
            setSourceSelected(true)
          }}
        />
        <Entypo name="home" size={24} color="black" />
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
    padding : 10,
    flexDirection : 'row',
    alignItems : 'center'
  },
});
