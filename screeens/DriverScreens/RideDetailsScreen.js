import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const RideDetailsScreen = () => {
  const [selectedFare, setSelectedFare] = useState(null);

  const ride = {
    rideId: "R123456",
    user: "John Doe",
    pickupLocation: "123 Main Street",
    dropoffLocation: "456 Elm Street",
    fare: 100,
  };

  const { rideId, user, pickupLocation, dropoffLocation, fare } = ride;

  const acceptRide = () => {
    Alert.alert("Congratulations", "Ride Accepted");
  };

  const skipRide = () => {
    // Logic to skip the ride
    Alert.alert("Ride skipped, wait for new Ride Request");
  };

  const offerFare = (amount) => {
    setSelectedFare(amount);
    Alert.alert("New Fare Offered", `Fare Offered: Rs ${amount}`);
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 22.4578,
            longitude: 88.5678,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: 22.4578, longitude: 88.5678 }}
            title="Pickup Location"
            description={pickupLocation}
          />
        </MapView>
      </View>

      {/* Ride Details */}
      <Text style={styles.title}>Ride Details</Text>
      <View style={{flexDirection : 'row', justifyContent : 'space-between', paddingRight : 30}}>
      <View style={styles.detailContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Ride ID:</Text>
          <Text style={styles.value}>{rideId}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>User:</Text>
          <Text style={styles.value}>{user}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Fare Offered:</Text>
          <Text style={styles.value}>{fare}</Text>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Pickup Location:</Text>
          <Text style={styles.value}>{pickupLocation}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Dropoff Location:</Text>
          <Text style={styles.value}>{dropoffLocation}</Text>
        </View>
      </View>
      </View>

      {/* Accept Ride */}
      <View style={styles.acceptContainer}>
        <Button
          title={`Accept for ${fare}`}
          onPress={acceptRide}
          color="#b7de55"
        />
      </View>

      {/* Offer Fare */}
      <View style={styles.offerContainer}>
        <Text style={styles.offerText}>Offer Your Fare:</Text>
        <View style={styles.fareButtons}>
          <Button
            title="Rs 120"
            onPress={() => offerFare(120)}
            color="#b7de55"
          />
          <Button
            title="Rs 150"
            onPress={() => offerFare(150)}
            color="#b7de55"
          />
          <Button
            title="Rs 160"
            onPress={() => offerFare(160)}
            color="#b7de55"
          />
        </View>
      </View>

      {/* Skip Ride */}
      <View style={styles.skipContainer}>
        <Button title="Skip" onPress={skipRide} color="#b7de55" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    paddingBottom: 80,
  },
  mapContainer: {
    flex: 2,
    marginBottom: 30,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailContainer: {
    marginBottom: 20,
  },
  acceptContainer: {
    marginBottom: 20,
  },
  offerContainer: {
    marginBottom: 20,
  },
  skipContainer: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b7de55",
  },
  detailItem: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  value: {
    fontSize: 16,
    color: "black",
  },
  offerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  fareButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RideDetailsScreen;
