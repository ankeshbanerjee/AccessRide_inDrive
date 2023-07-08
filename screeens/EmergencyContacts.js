import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Linking from 'expo-linking';

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      phoneNumber: "123-456-7890",
      category: "Family Members",
    },
    {
      id: 2,
      name: "Jane Smith",
      phoneNumber: "987-654-3210",
      category: "Caregivers",
    },
    {
      id: 3,
      name: "Police Station",
      phoneNumber: "911",
      category: "Police Stations",
    },
    {
      id: 4,
      name: "Medical Professional",
      phoneNumber: "123-123-1234",
      category: "Medical Professionals",
    },
  ]);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhoneNumber, setNewContactPhoneNumber] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const addContact = () => {
    if (newContactName.trim() === "" || newContactPhoneNumber.trim() === "" || newCategory.trim() === "") {
      // Alert or display an error message for empty fields
      return;
    }

    const newContact = {
      id: contacts.length + 1,
      name: newContactName,
      phoneNumber: newContactPhoneNumber,
      category: newCategory,
    };

    setContacts([...contacts, newContact]);
    setNewContactName("");
    setNewContactPhoneNumber("");
    setNewCategory("");
  };

  const removeContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
    setFilteredContacts(filteredContacts.filter((contact) => contact.id !== contactId));
  };

  const filterContactsByCategory = (category) => {
    if (category === 'All'){
      setFilteredContacts(contacts);
      return;
    }
    const filteredData = contacts.filter(
      (contact) => contact.category === category
    );
    setFilteredContacts(filteredData);
  };

  const renderContactItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.contactItemContainer} onPress={() => {
        if(Platform.OS === 'android')
          Linking.openURL(`tel:${item.phoneNumber}`);
        else
          Linking.openURL(`telprompt:${item.phoneNumber}`);
      }}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhoneNumber}>{item.phoneNumber}</Text>
        <Text style={styles.contactCategory}>{item.category}</Text>
        <TouchableOpacity
          onPress={() => removeContact(item.id)}
          style={styles.deleteButton}
        >
          <Icon name="trash-o" size={20} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.upperView}></View> */}
      <View style={styles.lowerView}>
        <Text style={styles.heading}>Emergency Contacts</Text>
        <View style={styles.filterButtonsContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterContactsByCategory("All")}
            >
              <Text style={styles.filterButtonText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterContactsByCategory("Family Members")}
            >
              <Text style={styles.filterButtonText}>Family Members</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterContactsByCategory("Caregivers")}
            >
              <Text style={styles.filterButtonText}>Caregivers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterContactsByCategory("Police Stations")}
            >
              <Text style={styles.filterButtonText}>Police Stations</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => filterContactsByCategory("Medical Professionals")}
            >
              <Text style={styles.filterButtonText}>Medical Professionals</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {filteredContacts.length > 0 ? (
          <FlatList
            data={filteredContacts}
            renderItem={renderContactItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.contactList}
          />
        ) : (
          <Text style={styles.emptyText}>
            No contacts available for this category.
          </Text>
        )}
        <View style={styles.addContactContainer}>
          <TextInput
            style={styles.contactInput}
            placeholder="Contact Name"
            value={newContactName}
            onChangeText={setNewContactName}
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Phone Number"
            value={newContactPhoneNumber}
            onChangeText={setNewContactPhoneNumber}
          />
          <TextInput
            style={styles.contactInput}
            placeholder="Category"
            value={newCategory}
            onChangeText={setNewCategory}
          />
          <TouchableOpacity onPress={addContact} style={styles.addButton}>
            <Text style={styles.addButtonLabel}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 60,
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
  contactList: {
    flexGrow: 1,
  },
  contactItemContainer: {
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  contactPhoneNumber: {
    fontSize: 14,
    color: "#888888",
    marginRight: 10,
  },
  contactCategory:{
    fontSize: 14,
    color: "#888888",
  },
  deleteButton: {
    marginLeft: 10,
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
  addContactContainer: {
    marginTop: 20,
  },
  contactInput: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: "#b7de55",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});
