import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import DriverCard from "../components/DriverCard";
import driversData from "../assets/data/driversData";

const Drivers = ({navigation}) => {
  return (
    <View>
      <View style={{ paddingBottom : 75 }}>
        <FlatList
          data={driversData}
          renderItem={({ item }) => (
            <DriverCard
              name={item.name}
              location={item.location}
              arrivalTime={item.arrivalTime}
              rating={item.rating}
              navigation = {navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Drivers;
