import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";

const Contact = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

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
        {/* <View style={styles.upperView}>
        <Text style={styles.upperText}>Help & Support</Text>
      </View> */}
        <View style={styles.middleView}>
          <Text style={styles.heading}>App Guidelines</Text>

          <Text style={styles.paragraph}>
            <Text style={styles.serialNumber}>1. </Text>
            <Text style={styles.guideText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum gravida euismod quam eget imperdiet. Suspendisse
              scelerisque ut ipsum vel auctor. Praesent sit amet dolor id
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.serialNumber}>2. </Text>
            <Text style={styles.guideText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum gravida euismod quam eget imperdiet. Suspendisse
              scelerisque ut ipsum vel auctor. Praesent sit amet dolor id
            </Text>
          </Text>
          <Text style={styles.paragraph}>
            <Text style={styles.serialNumber}>3. </Text>
            <Text style={styles.guideText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum gravida euismod quam eget imperdiet. Suspendisse
              scelerisque ut ipsum vel auctor. Praesent sit amet dolor id
            </Text>
          </Text>
          <Text style={styles.heading}>FAQs</Text>
          <TouchableOpacity style={styles.questionContainer}>
            <Text style={styles.serialNumber}>1. </Text>
            <Text style={styles.questionText}>
              How can I contact AccessRide in the event I need help with my
              booking?
            </Text>
            <Icon
              name="add"
              size={24}
              color="darkgreen"
              style={styles.plusIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.questionContainer}>
            <Text style={styles.serialNumber}>2. </Text>
            <Text style={styles.questionText}>
              Is booking cancellation allowed after booking?
            </Text>
            <Icon
              name="add"
              size={24}
              color="darkgreen"
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.lowerView}>
          <View style={styles.contactContainer}>
            <Icon
              name="phone"
              size={24}
              color="black"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText} selectable>
              +12345678910
            </Text>
          </View>
          <View style={styles.contactContainer}>
            <Icon
              name="email"
              size={24}
              color="black"
              style={styles.contactIcon}
            />
            <Text style={styles.contactText} selectable>
              xyz@gmail.com
            </Text>
          </View>
        </View>
      </ReactNativeZoomableView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
    // backgroundColor: "white",
    backgroundColor: "white",
    // paddingBottom: 50,
  },
  // upperView: {
  //   flex: 1.5,
  //   backgroundColor: "#b7ed55",
  //   flexDirection: "row-reverse",
  //   alignItems: "center",
  //   paddingHorizontal: 16,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   borderBottomLeftRadius: 20, // Rounded bottom left corner
  //   borderBottomRightRadius: 20, // Rounded bottom right corner
  // },
  upperText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 50,
  },
  icon: {
    fontWeight: "bold",
    marginTop: 50,
  },
  middleView: {
    flex: 5,
    // backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgreen",
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top of the container
    marginBottom: 10,
    position: "relative",
  },
  guideText: {
    marginLeft: 20,
    paddingRight: 32,
    fontSize: 16,
  },
  serialNumber: {
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    top: 0,
    fontSize: 20,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  questionText: {
    marginLeft: 20,
    flex: 1,
    paddingRight: 32,
    fontSize: 20,
  },
  plusIcon: {
    position: "absolute",
    right: 0,
    top: 0,
    fontSize: 40,
    marginTop: 10,
  },
  lowerView: {
    flex: 1,
    // backgroundColor: "#b7ed55",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop : 90
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactIcon: {
    marginRight: 8,
  },
  contactText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default Contact;
