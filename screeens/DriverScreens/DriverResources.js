import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";

const DriverResources = () => {
  const [tutorialVideos, setTutorialVideos] = useState([
    {
      id: 1,
      title: "Introduction to Accessibility",
      url: "https://example.com/video1",
    },
    {
      id: 2,
      title: "Assisting Passengers with Mobility Devices",
      url: "https://example.com/video2",
    },
    {
      id: 3,
      title: "Communication Techniques with Deaf Passengers",
      url: "https://example.com/video3",
    },
  ]);

  const [tutorialModules, setTutorialModules] = useState([
    { id: 1, title: "Understanding Different Disabilities" },
    { id: 2, title: "Accessible Vehicle Features" },
    { id: 3, title: "Proper Use of Wheelchair Ramps" },
  ]);

  const [offlineTrainingSessions, setOfflineTrainingSessions] = useState([
    {
      id: 1,
      date: "2023-07-15",
      time: "10:00 AM - 12:00 PM",
      location: "Training Center A",
    },
    {
      id: 2,
      date: "2023-07-20",
      time: "2:00 PM - 4:00 PM",
      location: "Training Center B",
    },
    {
      id: 3,
      date: "2023-07-25",
      time: "9:00 AM - 11:00 AM",
      location: "Training Center A",
    },
  ]);

  const [progress, setProgress] = useState(75);

  return (
    <View style={styles.container}>
      <View style={styles.lowerView}>
        <Text style={styles.heading}>Driver Resources</Text>
        <Text style={styles.sectionHeading}>Progress Report</Text>
        <Text style={styles.progressText}>Your progress: {progress}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressValue, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.sectionHeading}>Tutorial Videos</Text>
        {tutorialVideos.length > 0 ? (
          <FlatList
            data={tutorialVideos}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resourceItem}>
                <Text style={styles.resourceTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>No tutorial videos available.</Text>
        )}

        <Text style={styles.sectionHeading}>Tutorial Modules</Text>
        {tutorialModules.length > 0 ? (
          <FlatList
            data={tutorialModules}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resourceItem}>
                <Text style={styles.resourceTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>No tutorial modules available.</Text>
        )}

        <Text style={styles.sectionHeading}>Offline Training Sessions</Text>
        {offlineTrainingSessions.length > 0 ? (
          <FlatList
            data={offlineTrainingSessions}
            renderItem={({ item }) => (
              <View style={styles.trainingSessionItem}>
                <Text style={styles.trainingSessionDate}>{item.date}</Text>
                <Text style={styles.trainingSessionTime}>{item.time}</Text>
                <Text style={styles.trainingSessionLocation}>
                  {item.location}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>
            No offline training sessions available.
          </Text>
        )}
      </View>
    </View>
  );
};

export default DriverResources;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom : 75
  },
  upperView: {
    backgroundColor: "#b7de55",
    flex: 1,
  },
  lowerView: {
    backgroundColor: "white",
    flex: 6,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical : 15
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: 20,
    marginVertical : 10
  },
  resourceItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  resourceTitle: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  trainingSessionItem: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  trainingSessionDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  trainingSessionTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  trainingSessionLocation: {
    fontSize: 14,
    color: "#888888",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressValue: {
    height: "100%",
    backgroundColor: "#b7de55",
  },
});
