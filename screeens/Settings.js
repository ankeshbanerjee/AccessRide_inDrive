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
import { RadioButton } from "react-native-paper";
import ImageView from "react-native-image-viewing";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';


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
  const [cPreferencesChecked, setcPreferencesChecked] = React.useState("");
  const [seatChecked, setSeatChecked] = React.useState("");
  const [aromaChecked, setAromaChecked] = React.useState("");
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
  const [selectedSeatOption, setSelectedSeatOption] = useState(0);

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

  const [showGreenGallery, setShowGreenGallery] = useState(false);
  const [showSeaGallery, setShowSeaGallery] = useState(false);
  const [showFractalGallery, setShowFractalGallery] = useState(false);

  // const handleOpenGallery = () => {
  //   setShowGallery(true);
  // };

  // const handleCloseGallery = () => {
  //   setShowGallery(false);
  // };
  const [audioChecked, setAudioChecked] = useState("")
  const [sound1, setSound1] = useState(null);
  const [isPlaying1, setIsPlaying1] = useState(false);

  // Function to handle playing the audio
  async function playSound1() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio-1.mp3")
    );
    setSound1(sound);
    setIsPlaying1(true);
    await sound.playAsync();
  }

  // Function to handle pausing the audio
  async function pauseSound1() {
    if (sound1) {
      setIsPlaying1(false);
      await sound1.pauseAsync();
    }
  }

  const [sound2, setSound2] = useState(null);
  const [isPlaying2, setIsPlaying2] = useState(false);

  // Function to handle playing the audio
  async function playSound2() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio-2.mp3")
    );
    setSound2(sound);
    setIsPlaying2(true);
    await sound.playAsync();
  }

  // Function to handle pausing the audio
  async function pauseSound2() {
    if (sound2) {
      setIsPlaying2(false);
      await sound2.pauseAsync();
    }
  }


  const [sound3, setSound3] = useState(null);
  const [isPlaying3, setIsPlaying3] = useState(false);

  // Function to handle playing the audio
  async function playSound3() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio-3.mp3")
    );
    setSound3(sound);
    setIsPlaying3(true);
    await sound.playAsync();
  }

  // Function to handle pausing the audio
  async function pauseSound3() {
    if (sound3) {
      setIsPlaying3(false);
      await sound3.pauseAsync();
    }
  }


  const [sound4, setSound4] = useState(null);
  const [isPlaying4, setIsPlaying4] = useState(false);

  // Function to handle playing the audio
  async function playSound4() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio-4.mp3")
    );
    setSound4(sound);
    setIsPlaying4(true);
    await sound.playAsync();
  }

  // Function to handle pausing the audio
  async function pauseSound4() {
    if (sound4) {
      setIsPlaying4(false);
      await sound4.pauseAsync();
    }
  }


  const [sound5, setSound5] = useState(null);
  const [isPlaying5, setIsPlaying5] = useState(false);

  // Function to handle playing the audio
  async function playSound5() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio-5.mp3")
    );
    setSound5(sound);
    setIsPlaying5(true);
    await sound.playAsync();
  }

  // Function to handle pausing the audio
  async function pauseSound5() {
    if (sound5) {
      setIsPlaying5(false);
      await sound5.pauseAsync();
    }
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.upperview}>
        <Icon name="chevron-left" style={styles.icon} />
        <Text style={styles.heading}>Settings</Text>
      </View> */}
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

        <Text style={styles.driverText}>
          Request soothing Ride{Environment}
        </Text>
        {/* <View style={styles.line}>
          <Text style={styles.optionText}>Request Soothing Ride</Text>
          <Switch
            trackColor={{ false: "#d3d3d3", true: "#b7ed55" }}
            thumbColor={requestSoothingRide ? "#4b830d" : "#444"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleRequestSoothingRide}
            value={requestSoothingRide}
          />
        </View> */}
        <View style={styles.line} />
        <>
          <View style={styles.line}>
            <Text style={styles.soothingRideOption}>Noise Level</Text>
            <View style={{ width: "80%" }}>
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
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Text>Quiet</Text>
                <Text>Moderate</Text>
                <Text>Noisy</Text>
              </View>
            </View>
            <View style={styles.sliderLabelContainer}>
              <Text style={styles.sliderLabelText}>
                {noiseLevelLabels[noiseLevel]}
              </Text>
            </View>
          </View>

          <Text style={styles.soothingRideOption}>Lighting Conditions</Text>

          <Text style={styles.subOptionText}>Lighting Intensity</Text>
          {/* <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                value={lightingConditions}
                onValueChange={handleLightingConditionsChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              /> */}
          <View>
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
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Text>Dim</Text>
              <Text>Ambient</Text>
              <Text>Task</Text>
              <Text>Accent</Text>
              <Text>Bright</Text>
            </View>
          </View>
          {/* <Text style={styles.sliderLabel}>
                {getLightingIntensityLabel(lightingConditions)}
              </Text> */}

          <Text style={styles.subOptionText}>Color Selection</Text>
          <View style={styles.colorButtonsContainer}>
            {renderColorButtons()}
          </View>

          <View style={styles.line} />
          {/* <View style={styles.line}> */}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
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

          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Seat Comfort</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/recline.jpg")}
                cardText="Reclined Seats"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="reclined"
                  status={seatChecked === "reclined" ? "checked" : "unchecked"}
                  onPress={() => setSeatChecked("reclined")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/seatheight.jpg")}
                cardText="Adjust Seat Height"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="height"
                  status={seatChecked === "height" ? "checked" : "unchecked"}
                  onPress={() => setSeatChecked("height")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/lumbarsupport.jpg")}
                cardText="Added Lumbar Support"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="lumbar"
                  status={seatChecked === "lumbar" ? "checked" : "unchecked"}
                  onPress={() => setSeatChecked("lumbar")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/seattemperature.jpg")}
                cardText="Adjust Heating/Cooling"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="heatCool"
                  status={seatChecked === "heatCool" ? "checked" : "unchecked"}
                  onPress={() => setSeatChecked("heatCool")}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.line}></View>

          <Text style={styles.soothingRideOption}>
            Aromatherapy (Car fragrance)
          </Text>
          {/* <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={5}
                value={aromatherapy}
                onValueChange={handleAromatherapyChange}
                thumbTintColor="#4b830d"
                minimumTrackTintColor="#b7ed55"
                maximumTrackTintColor="#d3d3d3"
              /> */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Jasmine.jpg")}
                cardText="Jasmine"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Jasmine"
                  status={aromaChecked === "Jasmine" ? "checked" : "unchecked"}
                  onPress={() => setAromaChecked("Jasmine")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Lavender.jpg")}
                cardText="Lavender"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Lavender"
                  status={aromaChecked === "Lavender" ? "checked" : "unchecked"}
                  onPress={() => setAromaChecked("Lavender")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Lemongrass.jpg")}
                cardText="Lemongrass"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Lemongrass"
                  status={
                    aromaChecked === "Lemongrass" ? "checked" : "unchecked"
                  }
                  onPress={() => setAromaChecked("Lemongrass")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Rose.jpg")}
                cardText="Rose"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Rose"
                  status={aromaChecked === "Rose" ? "checked" : "unchecked"}
                  onPress={() => setAromaChecked("Rose")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Ylang-ylang.jpg")}
                cardText="Ylang-ylang"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Ylang-ylang"
                  status={
                    aromaChecked === "Ylang-ylang" ? "checked" : "unchecked"
                  }
                  onPress={() => setAromaChecked("Ylang-ylang")}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Card
                imageSource={require("../assets/Rosemary.jpg")}
                cardText="Rosemary"
              />
              <View style={{ marginRight: 20 }}>
                <RadioButton
                  value="Rosemary"
                  status={aromaChecked === "Rosemary" ? "checked" : "unchecked"}
                  onPress={() => setAromaChecked("Rosemary")}
                />
              </View>
            </View>
          </ScrollView>
          <View style={styles.line} />

          <Text style={styles.soothingRideOption}>Visual Display</Text>
          {/* <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              value={visualDisplay}
              onValueChange={handleVisualDisplayChange}
              thumbTintColor="#4b830d"
              minimumTrackTintColor="#b7ed55"
              maximumTrackTintColor="#d3d3d3"
            /> */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => setShowGreenGallery(true)}>
              <Card
                imageSource={require("../assets/lushgreen.jpg")}
                cardText="Lush green calming pictures"
              />
              <ImageView
                images={[
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/calming-photos-for-anxiety.jpg",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/Best-Calming-image.jpg",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/Calming-Pictures-of-All-time-1024x686.jpg",
                  },
                ]}
                imageIndex={0}
                visible={showGreenGallery}
                onRequestClose={() => setShowGreenGallery(false)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSeaGallery(true)}>
              <Card
                imageSource={require("../assets/seascape.jpg")}
                cardText="Seascape calming pictures"
              />
              <ImageView
                images={[
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/calming-picture-for-anxiety.jpg",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/photos-to-calm-anxiety.jpg",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/picture-to-calm-anxiety.jpg",
                  },
                ]}
                imageIndex={0}
                visible={showSeaGallery}
                onRequestClose={() => setShowSeaGallery(false)}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFractalGallery(true)}>
              <Card
                imageSource={require("../assets/fractal.png")}
                cardText="Fractal calming pictures"
              />
              <ImageView
                images={[
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/How-can-something-man-made-be-so-perfect.png",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/Fractal-Calming-Image-1024x684.jpg",
                  },
                  {
                    uri: "https://www.calmsage.com/wp-content/uploads/2020/04/That-is-never-ending-calm.png",
                  },
                ]}
                imageIndex={0}
                visible={showFractalGallery}
                onRequestClose={() => setShowFractalGallery(false)}
              />
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.line} />

          <Text style={styles.soothingRideOption}>
            Communication Preferences
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Silent Ride
            </Text>
            <RadioButton
              value="silent"
              status={
                cPreferencesChecked === "silent" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("silent")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            Minimal verbal interaction is preferred during the ride. The driver
            should only communicate essential information.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Limited conversation
            </Text>
            <RadioButton
              value="limited"
              status={
                cPreferencesChecked === "limited" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("limited")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            A quiet ride is preferred with minimal conversation. The driver
            should refrain from initiating conversation unless necessary.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Friendly Conversation
            </Text>
            <RadioButton
              value="friendly"
              status={
                cPreferencesChecked === "friendly" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("friendly")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            Open to friendly conversation during the ride. The driver can engage
            in casual conversation if the passenger initiates it.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Professional Communication
            </Text>
            <RadioButton
              value="professional"
              status={
                cPreferencesChecked === "professional" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("professional")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            Strictly professional communication is preferred. The driver should
            maintain a formal tone and only communicate necessary information
            related to the ride.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Non-Verbal Communication
            </Text>
            <RadioButton
              value="nonVerbal"
              status={
                cPreferencesChecked === "nonVerbal" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("nonVerbal")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            Prefer non-verbal communication methods such as hand signals or text
            messages instead of verbal communication.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              No Communication
            </Text>
            <RadioButton
              value="noCommunication"
              status={
                cPreferencesChecked === "noCommunication"
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => setcPreferencesChecked("noCommunication")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            No communication is preferred during the ride. The driver should
            refrain from initiating any conversation.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5 }}>
              Language Preference
            </Text>
            <RadioButton
              value="language"
              status={
                cPreferencesChecked === "language" ? "checked" : "unchecked"
              }
              onPress={() => setcPreferencesChecked("language")}
            />
          </View>
          <Text style={{ fontSize: 13, color: "grey" }}>
            Specify a preferred language for communication during the ride.
          </Text>

          <View style={styles.line} />

          <Text style={styles.soothingRideOption}>Music Selection</Text>
          {/* <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              value={musicSelection}
              onValueChange={handleMusicSelectionChange}
              thumbTintColor="#4b830d"
              minimumTrackTintColor="#b7ed55"
              maximumTrackTintColor="#d3d3d3"
            /> */}
          <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around' }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
            {!isPlaying1 ? (
              <TouchableOpacity onPress={playSound1}>
                <Entypo name="controller-play" size={24} color="#40c351" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pauseSound1}>
                <Ionicons name="pause" size={24} color="#40c351" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5, marginLeft : 10 }}>Audio 1</Text>
            </View>
            <RadioButton
              value="audio-1"
              status={
                audioChecked === "audio-1" ? "checked" : "unchecked"
              }
              onPress={() => setAudioChecked("audio-1")}
            />
          </View>

          <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around' }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
            {!isPlaying2 ? (
              <TouchableOpacity onPress={playSound2}>
                <Entypo name="controller-play" size={24} color="#40c351" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pauseSound2}>
                <Ionicons name="pause" size={24} color="#40c351" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5, marginLeft : 10 }}>Audio 2</Text>
            </View>
            <RadioButton
              value="audio-2"
              status={
                audioChecked === "audio-2" ? "checked" : "unchecked"
              }
              onPress={() => setAudioChecked("audio-2")}
            />
          </View>

          <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around' }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
            {!isPlaying3 ? (
              <TouchableOpacity onPress={playSound3}>
                <Entypo name="controller-play" size={24} color="#40c351" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pauseSound3}>
                <Ionicons name="pause" size={24} color="#40c351" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5, marginLeft : 10 }}>Audio 3</Text>
            </View>
            <RadioButton
              value="audio-3"
              status={
                audioChecked === "audio-3" ? "checked" : "unchecked"
              }
              onPress={() => setAudioChecked("audio-3")}
            />
          </View>

          <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around' }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
            {!isPlaying4 ? (
              <TouchableOpacity onPress={playSound4}>
                <Entypo name="controller-play" size={24} color="#40c351" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pauseSound4}>
                <Ionicons name="pause" size={24} color="#40c351" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5, marginLeft : 10 }}>Audio 4</Text>
            </View>
            <RadioButton
              value="audio-4"
              status={
                audioChecked === "audio-4" ? "checked" : "unchecked"
              }
              onPress={() => setAudioChecked("audio-4")}
            />
          </View>

          <View style={{ flexDirection : 'row', alignItems : 'center', justifyContent : 'space-around' }}>
            <View style={{ flexDirection : 'row', alignItems : 'center' }}>
            {!isPlaying5 ? (
              <TouchableOpacity onPress={playSound5}>
                <Entypo name="controller-play" size={24} color="#40c351" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={pauseSound5}>
                <Ionicons name="pause" size={24} color="#40c351" />
              </TouchableOpacity>
            )}
            <Text style={{ fontSize: 17, color: "black", marginVertical: 5, marginLeft : 10 }}>Audio 5</Text>
            </View>
            <RadioButton
              value="audio-5"
              status={
                audioChecked === "audio-5" ? "checked" : "unchecked"
              }
              onPress={() => setAudioChecked("audio-5")}
            />
          </View>

          <View style={styles.line} />
        </>
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
    // backgroundColor: "#b7ed55",
    flexDirection: "row",
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
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
    // marginLeft: 10,
    // marginRight: 10,
    paddingVertical: 15,
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
    marginVertical: 10,
  },
  colorSelectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 80,
  },
  colorButtonsContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    // marginTop: 40, // Add marginTop to create space above the color buttons
    // paddingRight: 20,
    width: "100%",
    marginVertical: 5,
    // flexGrow: 1,
    // marginLeft: -70,
    // marginRight: -20,
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
    aspectRatio: 5, // Adjust the aspect ratio as needed
    alignSelf: "center",
    marginLeft: 11,
  },
  temperatureSlider: {
    alignSelf: "center",
    width: "98%", // Adjust the width as needed
    margin: 0,
  },
  soothingRideOption: {
    fontSize: 17,
    fontWeight: "bold",
  },
  onSeatOptionSelection: {
    borderWidth: 1,
    borderColor: "green",
  },
});

export default Settings;
