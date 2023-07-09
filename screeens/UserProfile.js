import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

//translation modules

import { I18n } from "i18n-js";
import { en, hi, bn } from "../i18n";

import useStore from "../store";

const UserProfile = ({navigation}) => {
  const [image, setImage] = useState(null); // Initialize with null
  const [dummyImage, setDummyImage] = useState(
    require("../assets/userImage.jpg")
  ); // Dummy image path
  const [showImage, setShowImage] = useState(true);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("password123");
  const [phoneNumber, setPhoneNumber] = useState("123-456-7890");

  //localization
  const i18n = new I18n();

  const { locale } = useStore((state) => ({
    locale: state.locale,
  }));

  i18n.fallbacks = true;
  i18n.translations = { en, bn };
  i18n.locale = locale;

  // useEffect(() => {
  //   // Load initial image when the component mounts
  //   const loadImage = async () => {
  //     try {
  //       const imageUri = require("../assets/newImage.jpg"); // Replace with the correct image path
  //       setImage(imageUri);
  //     } catch (error) {
  //       console.log("Error loading initial image:", error);
  //     }
  //   };

  //   loadImage();
  // }, []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const pickImage = () => {
    Alert.alert(
      "Replace Image",
      "Do you want to select a new image or remove the existing one?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Select New Image",
          onPress: () => launchImagePicker(),
        },
        { text: "Remove Image", onPress: () => removeImage() },
      ]
    );
  };

  const launchImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    // const dummyImageUri = "../assets/newImage.jpg"; // Replace with the correct dummy image path
    // setImage(dummyImageUri);
    setImage(null);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleEditPress = () => {
    setEditing(!isEditing);
  };

  const handleSavePress = () => {
    setEditing(false);
    // Perform save/update logic here
  };

  const handleRemoveImage = () => {
    setShowImage(false);
  };

  const renderPasswordText = (password) => {
    return isPasswordVisible ? (
      <Text style={[styles.passwordText, styles.lightText]}>{password}</Text>
    ) : (
      <Text style={[styles.passwordText, styles.lightText]}>
        {"*".repeat(password.length)}
      </Text>
    );
  };

  const handleScrollToTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  };

  const scrollViewRef = useRef();

  return (
    <View style={styles.container}>
      {/* <View style={styles.upperView}> */}
      {/* <Icon name="chevron-left" style={styles.icon} /> */}
      {/* <View style={styles.photoContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.photo} />
          ) : (
            <Image
              source={require("../assets/newImage.jpg")} // Replace with the correct image path
              style={styles.photo}
            />
          )}

          <TouchableOpacity
            style={styles.cameraIconContainer}
            onPress={pickImage}
          > 
            <Icon name="camera" size={30} color="black" />
          </TouchableOpacity>
        </View> */}
      {/* <Icon name="cog" style={styles.settingsIcon} /> */}
      {/* </View> */}
      {/* <View
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { listener: () => {} }, // Add this empty listener to prevent the error
          { useNativeDriver: true }
        )} 
      >*/}
      <ScrollView style={styles.contentContainer}>
        <View style={{ height: 180 }}>
          {!image ? (
            <Image
              style={styles.profileImg}
              source={require("../assets/propic.png")}
            />
          ) : (
            <Image style={styles.profileImg} source={{ uri: image }} />
          )}
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => pickImage()}
          >
            <Entypo name="camera" size={27} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.lowerView}>
          {isEditing ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSavePress}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditPress}
            >
              <Icon name="edit" style={styles.editIcon} />
            </TouchableOpacity>
          )}
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.lightText}>{name}</Text>
            )}
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Email Address</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={styles.lightText}>{email}</Text>
            )}
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Password</Text>
            <View style={styles.passwordContainer}>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
              ) : (
                renderPasswordText(password)
              )}

              <TouchableOpacity
                style={styles.visibilityIcon}
                onPress={togglePasswordVisibility}
              >
                <Icon
                  name={isPasswordVisible ? "eye-slash" : "eye"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            ) : (
              <Text style={styles.lightText}>{phoneNumber}</Text>
            )}
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Wheelchair Accessible</Text>
            <Text style={styles.lightText}>Yes</Text>
          </View>
          <View style={styles.detailItem}>
            {/* <Text style={styles.headingText}>Assistance Needed</Text> */}
            <Text style={styles.lightText}>Visual impairment</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Mobility Aid</Text>
            <Text style={styles.lightText}>Crutches</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Service Animal</Text>
            <Text style={styles.lightText}>Guide dog</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Communication Needs</Text>
            <Text style={styles.lightText}>Sign language</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Preferred Communication Mode</Text>
            <Text style={styles.lightText}>Text-to-speech</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Allergies</Text>
            <Text style={styles.lightText}>Dust and Fumes</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Medical Conditions</Text>
            <Text style={styles.lightText}>Asthma</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Hearing Impairment</Text>
            <Text style={styles.lightText}>Yes</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Speech Impairment</Text>
            <Text style={styles.lightText}>Stuttering</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Cognitive Impairment</Text>
            <Text style={styles.lightText}>Memory loss</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Seizure Disorders</Text>
            <Text style={styles.lightText}>Epilepsy</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Physical Disability</Text>
            <Text style={styles.lightText}>Spinal cord injury</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Sensory Processing Disorder</Text>
            <Text style={styles.lightText}>Hyperacusis</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Visual Impairment</Text>
            <Text style={styles.lightText}>Blindness</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.headingText}>Medication Requirements</Text>
            <Text style={styles.lightText}>Insulin</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.pastRidebtn} onPress={()=>navigation.navigate("RideHistory")}>
          <Text style={{fontSize : 17, fontWeight : 'bold'}}>Click to see your past rides</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* </View> */}
      {/* <Animated.View
        style={[
          styles.scrollToTopButton,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 500],
              outputRange: [0, 1],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <TouchableOpacity onPress={handleScrollToTop}>
          <Icon name="arrow-up" style={styles.scrollToTopIcon} />
        </TouchableOpacity>
      </Animated.View> */}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 75,
  },

  upperView: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: "#b7ed55",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10,
    // paddingTop: 40,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // zIndex: 1,
  },
  icon: {
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // marginLeft: 80,
    marginTop: 20, // Adjust the marginTop as desired
  },
  photoContainer: {
    // position: "relative",
    // marginBottom: 20, // Adjust the marginBottom as desired
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },

  settingsIcon: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "auto",
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    // flex: 6,
  },
  lowerView: {
    // flex: 4,
    backgroundColor: "white",
    paddingHorizontal: 40,
    // paddingTop: 60,
    // marginTop: 150,
  },
  detailItem: {
    marginBottom: 10,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  lightText: {
    color: "#a8a8a8",
    backgroundColor: "#f5f5f5",
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Add this line to align items with space between
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12, // Add horizontal padding
    marginTop: 8,
  },
  visibilityIcon: {
    fontSize: 24, // Adjust the font size as needed
    // paddingBottom: 35,
  },
  passwordText: {
    // flex: 1,
    fontSize: 16,
    paddingBottom: 11,
  },
  editButton: {
    // position: "absolute",
    // top: 40,
    // right: 20,
    alignSelf: "flex-end",
    backgroundColor: "#b7ed55",
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  editIcon: {
    fontSize: 20,
    color: "white",
  },
  saveButton: {
    // position: "absolute",
    // top: 40,
    // right: 20,
    alignSelf: "flex-end",
    backgroundColor: "#b7ed55",
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 8,
    fontSize: 16,
  },
  scrollToTopButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#b7ed55",
    borderRadius: 50,
    padding: 10,
    elevation: 2,
    zIndex: 1,
  },
  scrollToTopIcon: {
    color: "white",
    fontSize: 24,
  },
  profileImg: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 140 / 2,
  },
  cameraIcon: {
    position: "absolute",
    top: 125,
    right: 125,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 50,
  },
  pastRidebtn: {
    padding: 10,
    backgroundColor: "#b7ed55",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
});
