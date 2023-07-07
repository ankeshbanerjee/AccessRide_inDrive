import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  Environment,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CheckBox from "expo-checkbox";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

const COLORS = [
  "#C0392B",
  "#E74C3C",
  "#9B59B6",
  "#8E44AD",
  "#2980B9",
  "#C9AA88",
  "#C0C0C0",
  "#FCC3A3",

  "#C76B98",
  "#F09F9C",
  "#B7ED55",
];

const Settings = () => {
  const [voiceAssistant, setVoiceAssistant] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [allowLocation, setAllowLocation] = useState(false);
  const [getHelpFromDriver, setGetHelpFromDriver] = useState(false);
  const [alwaysSendWithRamp, setAlwaysSendWithRamp] = useState(false);
  const [needHelpToWalk, setNeedHelpToWalk] = useState(false);
  const [understandsSignLanguage, setUnderstandsSignLanguage] = useState(false);
  const [requestSoothingRide, setRequestSoothingRide] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(50);
  const [lightingConditions, setLightingConditions] = useState(0);
  const [temperatureControl, setTemperatureControl] = useState(20);
  const [seatComfort, setSeatComfort] = useState(0);
  const [aromatherapy, setAromatherapy] = useState(0);
  const [visualDisplay, setVisualDisplay] = useState(0);
  const [communicationPreferences, setCommunicationPreferences] = useState(0);
  const [musicSelection, setMusicSelection] = useState(0);

  const [selectedColor, setSelectedColor] = useState("#C0392B");
  const Card = ({ imageSource, cardText }) => (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{cardText}</Text>
      </View>
    </View>
  );
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleTemperatureControlChange = (value) => {
    setTemperatureControl(value);
  };

  const renderColorButtons = () => {
    return (
      <View style={styles.colorButtonsContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.colorButtonsContent}
          showsHorizontalScrollIndicator={false}
        >
          {COLORS.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColorButton,
              ]}
              onPress={() => handleColorChange(color)}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const noiseLevelLabels = ["Quiet", "Moderate", "Noisy"];

  const getLightingIntensityLabel = (intensity) => {
    const intensityLabels = ["Dim Light", "Moderate Light", "Bright Light"];
    return intensityLabels[intensity];
  };

  const handleToggleVoiceAssistant = () => {
    setVoiceAssistant((prevState) => !prevState);
  };

  const handleToggleLargeText = () => {
    setLargeText((prevState) => !prevState);
  };

  const handleToggleHighContrast = () => {
    setHighContrast((prevState) => !prevState);
  };

  const handleToggleAllowLocation = () => {
    setAllowLocation((prevState) => !prevState);
  };

  const handleToggleGetHelpFromDriver = () => {
    setGetHelpFromDriver((prevState) => !prevState);
  };

  const handleToggleAlwaysSendWithRamp = () => {
    setAlwaysSendWithRamp((prevState) => !prevState);
  };

  const handleToggleNeedHelpToWalk = () => {
    setNeedHelpToWalk((prevState) => !prevState);
  };

  const handleToggleUnderstandsSignLanguage = () => {
    setUnderstandsSignLanguage((prevState) => !prevState);
  };

  const handleToggleRequestSoothingRide = () => {
    setRequestSoothingRide((prevState) => !prevState);
  };

  const handleNoiseLevelChange = (value) => {
    setNoiseLevel(value);
  };

  const handleLightingConditionsChange = (value) => {
    setLightingConditions(value);
  };

  const handleSeatComfortChange = (value) => {
    setSeatComfort(value);
  };

  const handleAromatherapyChange = (value) => {
    setAromatherapy(value);
  };

  const handleVisualDisplayChange = (value) => {
    setVisualDisplay(value);
  };

  const handleCommunicationPreferencesChange = (value) => {
    setCommunicationPreferences(value);
  };

  const handleMusicSelectionChange = (value) => {
    setMusicSelection(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperview}>
        <Icon name="chevron-left" style={styles.icon} />
        <Text style={styles.heading}>Settings</Text>
      </View>
      <ScrollView
        style={styles.lowerview}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.line}>
          <Text style={styles.optionText}>Voice Assistant</Text>
          <Switch
            value={voiceAssistant}
            onValueChange={handleToggleVoiceAssistant}
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={voiceAssistant ? "#4b830d" : "#444"}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.optionText}>Large Text</Text>
          <Switch
            value={largeText}
            onValueChange={handleToggleLargeText}
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={largeText ? "#4b830d" : "#444"}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.optionText}>High Contrast</Text>
          <Switch
            value={highContrast}
            onValueChange={handleToggleHighContrast}
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={highContrast ? "#4b830d" : "#444"}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.optionText}>Allow User Location</Text>
          <Switch
            value={allowLocation}
            onValueChange={handleToggleAllowLocation}
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={allowLocation ? "#4b830d" : "#444"}
          />
        </View>

        <Text style={styles.driverText}>Driver Accessibility Preferences</Text>
        <View style={styles.line}></View>
        <View style={styles.line}>
          <Text style={styles.optionText}>Get Help From Driver</Text>
          <CheckBox
            value={getHelpFromDriver}
            onValueChange={handleToggleGetHelpFromDriver}
            tintColors={{ true: "#4b830d", false: "#444" }}
          />
        </View>
        <View style={styles.line}>
          <Text style={styles.optionText}>Always send car with ramp</Text>
          <CheckBox
            value={alwaysSendWithRamp}
            onValueChange={handleToggleAlwaysSendWithRamp}
            tintColors={{ true: "#4b830d", false: "#444" }}
          />
        </View>
        <View style={styles.line}>
          <Text style={[styles.optionText, { marginTop: 10, marginBottom: 5 }]}>
            Need help to walk into car
          </Text>
          <CheckBox
            value={needHelpToWalk}
            onValueChange={handleToggleNeedHelpToWalk}
            tintColors={{ true: "#4b830d", false: "#444" }}
          />
        </View>
        <View style={styles.line}>
          <Text style={[styles.optionText, { marginBottom: 20 }]}>
            Understands sign language
          </Text>
          <CheckBox
            value={understandsSignLanguage}
            onValueChange={handleToggleUnderstandsSignLanguage}
            tintColors={{ true: "#4b830d", false: "#444" }}
          />
        </View>

        <Text style={styles.driverText}>Customised Ride {Environment}</Text>
        <View style={styles.line}>
          <Text style={styles.optionText}>Request Soothing Ride</Text>
          <Switch
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={requestSoothingRide ? "#4b830d" : "#444"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleRequestSoothingRide}
            value={requestSoothingRide}
          />
        </View>
        {requestSoothingRide && (
          <>
            <View style={styles.line}>
              <Text style={styles.optionText}>Noise Level</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={2}
                value={noiseLevel}
                onValueChange={handleNoiseLevelChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              />
              <View style={styles.sliderLabelContainer}>
                <Text style={styles.sliderLabelText}>
                  {noiseLevelLabels[noiseLevel]}
                </Text>
              </View>
            </View>

            <Text style={styles.optionText}>Lighting Conditions</Text>

            <View style={styles.line}>
              <Text style={styles.subOptionText}>Lighting Intensity</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={lightingConditions}
                onValueChange={handleLightingConditionsChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              />
              <Text style={styles.sliderLabel}>
                {getLightingIntensityLabel(lightingConditions)}
              </Text>
            </View>

            <View style={styles.line}>
              <Text style={styles.colorSelectionTitle}>Color Selection</Text>
              <View style={styles.colorButtonsContainer}>
                {renderColorButtons()}
              </View>
            </View>

            {/* <View style={styles.line}> */}
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom : 10 }}>
              Temperature adjustment
            </Text>
            <Slider
              style={[styles.slider, styles.temperatureSlider]}
              minimumValue={0}
              maximumValue={30}
              value={temperatureControl}
              onValueChange={handleTemperatureControlChange}
              thumbTintColor="#4b830d"
              minimumTrackTintColor="#b7ed55"
              maximumTrackTintColor="#d3d3d3"
            />
            {/* </View> */}

            {/* <View style={styles.line}> */}
            <Image
              source={require("../assets/temperature.jpg")}
              style={styles.temperatureImage}
              resizeMode="contain"
            />
            {/* </View> */}

            <View style={styles.line} />

            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Seat Comfort
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity>
                <Card
                  imageSource={require("../assets/recline.jpg")}
                  cardText="Reclined Seats"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Card
                  imageSource={require("../assets/seatheight.jpg")}
                  cardText="Adjust Seat Height"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Card
                  imageSource={require("../assets/lumbarsupport.jpg")}
                  cardText="Added Lumbar Support"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Card
                  imageSource={require("../assets/seattemperature.jpg")}
                  cardText="Adjust Heating/Cooling"
                />
              </TouchableOpacity>
            </ScrollView>
            <View style={styles.line}></View>
            <View style={styles.line}>
              <Text style={styles.optionText}>Aromatherapy</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5}
                value={aromatherapy}
                onValueChange={handleAromatherapyChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              />
            </View>
            <View style={styles.line}>
              <Text style={styles.optionText}>Visual Display</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={visualDisplay}
                onValueChange={handleVisualDisplayChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              />
            </View>

            <View style={styles.line}>
              <Text style={styles.optionText}>Music Selection</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5}
                value={musicSelection}
                onValueChange={handleMusicSelectionChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 75,
  },
  upperview: {
    flex: 0.125,
    backgroundColor: "#b7ed55",
    flexDirection: "row",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icon: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 150,
    marginTop: 30,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginLeft: -30,
  },
  lowerview: {
    flex: 8,
    backgroundColor: "white",
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  driverText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  sliderLabelContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderLabelText: {
    marginTop: 5,
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  subOptionText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  colorSelectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 80,
  },
  colorButtonsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 10, // Add marginTop to create space above the color buttons
    paddingRight: 20,
    flexGrow: 1,
    marginLeft: -70,
    marginRight: -20,
  },
  colorButtonsContent: {
    alignItems: "flex-start",
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: "black",
  },
  card: {
    width: 200,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardTextContainer: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  tempsliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  temperatureImage: {
    width: "94%",
    height: undefined,
    aspectRatio: 3, // Adjust the aspect ratio as needed
    alignSelf: "center",
    marginLeft: 11,
  },
  temperatureSlider: {
    alignSelf: "center",
    width: "98%", // Adjust the width as needed
    margin: 0,
  },
});

export default Settings;
