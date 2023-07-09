import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const CommunityForumScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [newDiscussionTitle, setNewDiscussionTitle] = useState("");
  const [newDiscussionContent, setNewDiscussionContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [discussionThread, setDiscussionThread] = useState([
    {
      id: 1,
      category: "Accessible Transportation",
      title: "Accessible Cab Services in the City",
      username: "JohnDoe",
      content:
        "I recently moved to the city and I'm looking for accessible cab services that cater to disabled passengers. Can anyone recommend reliable cab companies that offer wheelchair-accessible vehicles? Any insights or experiences would be greatly appreciated!",
    },
    {
      id: 2,
      category: "Disability Transport Solutions",
      title: "Accessible Vans for Group Outings",
      username: "AccessRider",
      content:
        "I'm part of a disability support group, and we often plan outings and activities. We are looking for disability transport solutions that can accommodate a group of individuals with different mobility needs. Does anyone have recommendations for wheelchair-accessible vans or transport services that can accommodate larger groups? It would be great to find a reliable option that can ensure our group outings are inclusive and enjoyable for everyone. Any suggestions or experiences would be highly appreciated!",
    },
    {
      id: 3,
      category: "Accessible Transportation",
      title:
        "Accessible Transportation Options for Visually Impaired Individuals",
      username: "JaneSmith",
      content:
        "I'm visually impaired and rely on public transportation. However, I often face challenges in finding accessible options. Are there any cab services or transportation programs specifically designed to assist visually impaired individuals? Please share your recommendations or tips for navigating the city's transportation system.",
    },
    {
      id: 4,
      category: "Special Assistance Rides",
      title: "Airport Assistance for Disabled Travelers",
      username: "Traveler23",
      content:
        "I will be traveling by air soon and I require special assistance due to my mobility impairment. Can anyone share their experiences or recommendations for airport assistance services? Specifically, I'm looking for information on wheelchair escorts, accessible transportation within the airport, and any additional support that can make the travel experience smoother for disabled passengers. Thank you in advance",
    },
    {
      id: 5,
      category: "Special Assistance Rides",
      title: "Accessible Taxis with Trained Drivers",
      username: "AccessRider",
      content:
        "I rely on taxis for my daily commute, and it's crucial for me to find accessible cabs with drivers who are trained in assisting passengers with disabilities. Does anyone know of any taxi companies that prioritize accessibility and provide trained drivers? Your recommendations and insights would be invaluable to ensure a safe and comfortable transportation experience.",
    },
    {
      id: 6,
      category: "Special Assistance Rides",
      title: "Transportation Options for Elderly Individuals",
      username: "CaringRelative",
      content:
        "I'm seeking transportation solutions for my elderly parent who has limited mobility. We're looking for special assistance rides that can accommodate a senior individual with a walker or wheelchair. It would be great to hear about any services, programs, or companies that provide reliable transportation options specifically tailored to the needs of elderly passengers. Any suggestions or advice would be greatly appreciated!",
    },
  ]);

  const startDiscussion = () => {
    const newDiscussion = {
      id: discussionThread.length + 1,
      category: selectedCategory,
      title: newDiscussionTitle,
      username: "User",
      content: newDiscussionContent,
    };

    setDiscussionThread([...discussionThread, newDiscussion]);

    // Clear new discussion fields after posting
    setNewDiscussionTitle("");
    setNewDiscussionContent("");
  };

  const renderDiscussionThread = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text>{item.content}</Text>
    </View>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item ? styles.selectedCategory : null,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const filteredDiscussions = discussionThread.filter((discussion) => {
    const categoryMatches =
      selectedCategory === "All" || discussion.category === selectedCategory;
    const searchMatches =
      discussion.title.toLowerCase().includes(searchText.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchText.toLowerCase());

    return categoryMatches && searchMatches;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.categories}>
        <Text style={styles.categoryTitle}>Categories and Topics:</Text>
        <FlatList
          data={[
            "All",
            "Accessible Transportation",
            "Disability Transport Solutions",
            "Special Assistance Rides",
          ]}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.recentDiscussions}>
        <Text style={styles.discussionTitle}>Recent Discussions:</Text>
        <FlatList
          data={filteredDiscussions}
          renderItem={({ item }) => <Text>{item.title}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.newDiscussion}>
        <Text style={styles.discussionTitle}>Start a New Discussion:</Text>
        <TextInput
          style={styles.discussionInput}
          placeholder="Title"
          value={newDiscussionTitle}
          onChangeText={setNewDiscussionTitle}
        />
        <TextInput
          style={styles.discussionInput}
          placeholder="Content"
          value={newDiscussionContent}
          onChangeText={setNewDiscussionContent}
          multiline
        />
        <TouchableOpacity style={styles.postButton} onPress={startDiscussion}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.discussionThread}>
        <Text style={styles.discussionTitle}>Discussion Thread:</Text>
        <FlatList
          data={filteredDiscussions}
          renderItem={renderDiscussionThread}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.notifications}>{/* Render notifications */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    height : '90%'
  },
  searchBar: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  categories: {
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#b7de55",
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#b7de55",
  },
  categoryText: {
    color: "white",
  },
  selectedCategory: {
    backgroundColor: "#55a5de",
  },
  recentDiscussions: {
    marginBottom: 10,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#b7de55",
  },
  newDiscussion: {
    marginBottom: 10,
  },
  discussionInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  postButton: {
    backgroundColor: "#b7de55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  postButtonText: {
    color: "white",
    textAlign: "center",
  },
  discussionThread: {
    marginBottom: 10,
    // paddingBottom : 50
  },
  postContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    padding: 10,
    paddingBottom : 70
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  notifications: {
    // Add styles for notifications
  },
});

export default CommunityForumScreen;
