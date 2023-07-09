import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DriverDashboardScreen = () => {
  const [currentRide, setCurrentRide] = useState({
    id: 1,
    passengerName: "John Doe",
    pickupLocation: "Connaught Place, New Delhi",
    dropoffLocation: "Karol Bagh, New Delhi",
  });

  const [pastRides, setPastRides] = useState([
    { id: 2, passengerName: "John Doe", rating: 4 },
    { id: 3, passengerName: "Jane Smith", rating: 5 },
    { id: 4, passengerName: "David Johnson", rating: 3 },
  ]);

  const [upcomingRides, setUpcomingRides] = useState([
    {
      id: 5,
      passengerName: "Emily Brown",
      pickupLocation: "MG Road, Bengaluru",
      dropoffLocation: "Indiranagar, Bengaluru",
    },
    {
      id: 6,
      passengerName: "Michael Johnson",
      pickupLocation: "Juhu Beach, Mumbai",
      dropoffLocation: "Gateway of India, Mumbai",
    },
    {
      id: 7,
      passengerName: "Sarah Anderson",
      pickupLocation: "Ellis Bridge, Ahmedabad",
      dropoffLocation: "Sabarmati Ashram, Ahmedabad",
    },
  ]);

  const [topRatedRides, setTopRatedRides] = useState([
    { id: 8, passengerName: "John Doe", rating: 5 },
    { id: 9, passengerName: "Jane Smith", rating: 5 },
    { id: 10, passengerName: "David Johnson", rating: 4.5 },
  ]);

  const [leastRatedRides, setLeastRatedRides] = useState([
    { id: 11, passengerName: "Emily Brown", rating: 3 },
    { id: 12, passengerName: "Michael Johnson", rating: 2.5 },
    { id: 13, passengerName: "Sarah Anderson", rating: 2 },
  ]);

  const [filter, setFilter] = useState("all");

  const renderRideItem = ({ item }) => {
    return (
      <View style={styles.rideItemContainer}>
        <Text style={styles.passengerName}>{item.passengerName}</Text>
        {item.rating && (
          <Text style={styles.rating}>Rating: {item.rating}</Text>
        )}
        {item.pickupLocation && item.dropoffLocation && (
          <Text style={styles.rideLocation}>
            {item.pickupLocation} to {item.dropoffLocation}
          </Text>
        )}
      </View>
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  let filteredRides = [];
  if (filter === "past") {
    filteredRides = pastRides;
  } else if (filter === "upcoming") {
    filteredRides = upcomingRides;
  } else if (filter === "topRated") {
    filteredRides = topRatedRides;
  } else if (filter === "leastRated") {
    filteredRides = leastRatedRides;
  } else {
    filteredRides = [
      ...pastRides,
      ...upcomingRides,
      ...topRatedRides,
      ...leastRatedRides,
    ];
  }

  const reviews = [
    { id: 1, text: "Great driver, very professional." },
    { id: 2, text: "Safe and comfortable ride." },
    { id: 3, text: "Excellent service, highly recommended." },
    { id: 4, text: "Friendly and punctual driver." },
    { id: 5, text: "Best car service I have experienced so far." },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <Text style={styles.title}>Driver Dashboard</Text>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={styles.sectionHeading}>Ongoing Ride</Text>
        {currentRide && (
          <View style={styles.rideItemContainer}>
            <Text style={styles.passengerName}>
              {currentRide.passengerName}
            </Text>
            <Text style={styles.rideLocation}>
              {currentRide.pickupLocation} to {currentRide.dropoffLocation}
            </Text>
          </View>
        )}
      </View>

      <View style={{paddingHorizontal : 20, paddingBottom : 20}}>
          <Text style={{fontSize : 20, fontWeight : 'bold', paddingBottom : 10}}>Top Reviews</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.review}>
              <Text>{review.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.lowerView}>
        <View style={styles.filterButtonsContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "all" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("all")}
            >
              <Text style={styles.filterButtonText}>All Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "past" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("past")}
            >
              <Text style={styles.filterButtonText}>Past Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "upcoming" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("upcoming")}
            >
              <Text style={styles.filterButtonText}>Upcoming Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "topRated" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("topRated")}
            >
              <Text style={styles.filterButtonText}>Top Rated</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filter === "leastRated" && styles.activeFilterButton,
              ]}
              onPress={() => handleFilterChange("leastRated")}
            >
              <Text style={styles.filterButtonText}>Least Rated</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <FlatList
          data={filteredRides}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No rides available.</Text>
          }
        />
      </View>
    </View>
  );
};

export default DriverDashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 60,
  },
  upperView: {
    // backgroundColor: "#b7de55",
    // flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  lowerView: {
    backgroundColor: "white",
    flex: 6,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#b7de55",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    margin: 3,
  },
  activeFilterButton: {
    backgroundColor: "#88b73f",
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  rideItemContainer: {
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
  },
  passengerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    marginBottom: 5,
  },
  rideLocation: {
    fontSize: 14,
    color: "#888888",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  sectionHeading: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  review: {
    borderWidth: 1,
    borderColor: "black",
    width: 150,
    paddingHorizontal : 15,
    paddingVertical : 5,
    borderRadius : 15,
    marginRight : 10
  },
});
