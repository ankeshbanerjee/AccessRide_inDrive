import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([
    {
      "id": 1,
      "date": "01-11-2022",
      "pickupLocation": "Connaught Place, New Delhi",
      "dropoffLocation": "Karol Bagh, New Delhi",
      "fare": "₹200",
      "driver": "Aman Sharma",
      "rating": 4.5
    },
    {
      "id": 2,
      "date": "12-01-2023",
      "pickupLocation": "MG Road, Bengaluru",
      "dropoffLocation": "Indiranagar, Bengaluru",
      "fare": "₹150",
      "driver": "Neha Kapoor",
      "rating": 3.8
    },
    {
      "id": 3,
      "date": "09-03-2023",
      "pickupLocation": "Juhu Beach, Mumbai",
      "dropoffLocation": "Gateway of India, Mumbai",
      "fare": "₹250",
      "driver": "Rajesh Khanna",
      "rating": 4.2
    },
    {
      "id": 4,
      "date": "24-04-2023",
      "pickupLocation": "Ellis Bridge, Ahmedabad",
      "dropoffLocation": "Sabarmati Ashram, Ahmedabad",
      "fare": "₹100",
      "driver": "Priya Patel",
      "rating": 4.7
    },
    {
      "id": 5,
      "date": "02-05-2023",
      "pickupLocation": "Gomti Nagar, Lucknow",
      "dropoffLocation": "Hazratganj, Lucknow",
      "fare": "₹120",
      "driver": "Vikram Singh",
      "rating": 3.5
    },
    {
      "id": 6,
      "date": "15-06-2023",
      "pickupLocation": "Hitech City, Hyderabad",
      "dropoffLocation": "Charminar, Hyderabad",
      "fare": "₹180",
      "driver": "Ananya Reddy",
      "rating": 4.9
    }
  ]
  );
  const [sortedRideHistory, setSortedRideHistory] = useState(rideHistory);

  const sortPriceHighToLow = () => {
    const sortedData = [...rideHistory].sort(
      (a, b) =>
        parseFloat(b.fare.substring(1)) - parseFloat(a.fare.substring(1))
    );
    setSortedRideHistory(sortedData);
  };

  const sortPriceLowToHigh = () => {
    const sortedData = [...rideHistory].sort(
      (a, b) =>
        parseFloat(a.fare.substring(1)) - parseFloat(b.fare.substring(1))
    );
    setSortedRideHistory(sortedData);
  };

  const sortMostRecent = () => {
    const sortedData = [...rideHistory].sort(
      (a, b) =>
        new Date(b.date.split("-").reverse().join("-")) -
        new Date(a.date.split("-").reverse().join("-"))
    );
    setSortedRideHistory(sortedData);
  };

  const sortOlderRidesFirst = () => {
    const sortedData = [...rideHistory].sort(
      (a, b) =>
        new Date(a.date.split("-").reverse().join("-")) -
        new Date(b.date.split("-").reverse().join("-"))
    );
    setSortedRideHistory(sortedData);
  };

  const sortRatingHighToLow = () => {
    const sortedData = [...rideHistory].sort((a, b) => b.rating - a.rating);
    setSortedRideHistory(sortedData);
  };

  const sortRatingLowToHigh = () => {
    const sortedData = [...rideHistory].sort((a, b) => a.rating - b.rating);
    setSortedRideHistory(sortedData);
  };
  

  const renderRideItem = ({ item }) => {
    return (
      <View style={styles.rideItemContainer}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text style={styles.rideLocation}>
          {item.pickupLocation} to {item.dropoffLocation}
        </Text>
        <Text style={styles.rideFare}>Fare: {item.fare}</Text>
        <Text style={styles.rideDriver}>Driver: {item.driver}</Text>
        <Text style={styles.rideDriver}>Rating: {item.rating}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.upperView}></View> */}
      <View style={styles.lowerView}>
        <Text style={styles.heading}>Ride History</Text>
        <View style={styles.filterButtonsContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortPriceHighToLow}
          >
            <Text style={styles.filterButtonText}>Price High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortPriceLowToHigh}
          >
            <Text style={styles.filterButtonText}>Price Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortMostRecent}
          >
            <Text style={styles.filterButtonText}>Most Recent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortOlderRidesFirst}
          >
            <Text style={styles.filterButtonText}>Older Rides First</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortRatingHighToLow}
          >
            <Text style={styles.filterButtonText}>Rating High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={sortRatingLowToHigh}
          >
            <Text style={styles.filterButtonText}>Rating Low to High</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>
        {sortedRideHistory.length > 0 ? (
          <FlatList
            data={sortedRideHistory}
            renderItem={renderRideItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.rideList}
          />
        ) : (
          <Text style={styles.emptyText}>No ride history available.</Text>
        )}
      </View>
    </View>
  );
};

export default RideHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom : 60
  },
  upperView: {
    backgroundColor: "#b7de55",
    flex: 1,
  },
  lowerView: {
    backgroundColor: "white",
    flex: 6,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  rideList: {
    flexGrow: 1,
  },
  rideItemContainer: {
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
  },
  rideDate: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rideLocation: {
    fontSize: 14,
    marginBottom: 5,
  },
  rideFare: {
    fontSize: 14,
    marginBottom: 5,
  },
  rideDriver: {
    fontSize: 14,
    color: "#888888",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
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
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
