import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import * as Clipboard from "expo-clipboard";

const InclusivePromotionsScreen = () => {
  const [copiedPromo, setCopiedPromo] = useState(null);

  const promotions = [
    {
      id: "promo1",
      title: "Accessibility Upgrade",
      description: "Upgrade to an accessible vehicle for no additional cost.",
      promoCode: "ACCESS20",
    },
    {
      id: "promo2",
      title: "Companion Discount",
      description: "Get a discount when traveling with a companion.",
      promoCode: "COMP50",
    },
    {
      id: "promo3",
      title: "Accessible Tour Discount",
      description: "Discounts on accessible city tours and attractions.",
      promoCode: "TOUR10",
    },
    {
      id: "promo4",
      title: "Priority Booking",
      description:
        "Skip the queue and get priority booking as a disabled user.",
      promoCode: "PRIO20",
    },
    {
      id: "promo5",
      title: "Accessible Airport Transfers",
      description: "Special discounts on accessible airport transfers.",
      promoCode: "AIR01",
    },
  ];

  const handlePromotionSelect = (promoCode) => {
    Clipboard.setString(promoCode);
    setCopiedPromo(promoCode);
    ToastAndroid.show("Promo Code Successfully Copied", ToastAndroid.SHORT);
  };

  const renderPromotionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.promotionCard}
      onPress={() => handlePromotionSelect(item.promoCode)}
    >
      <Text style={styles.promotionTitle}>{item.title}</Text>
      <Text style={styles.promotionDescription}>{item.description}</Text>
      {copiedPromo === item.promoCode && (
        <Text style={styles.copiedMessage}>Promo Code Copied!</Text>
      )}
      <View style={styles.promoCodeContainer}>
        <Text style={styles.promoCode}>{item.promoCode}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inclusive Promotions and Discounts</Text>
      <FlatList
        data={promotions}
        renderItem={renderPromotionItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    paddingBottom : 60
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  promotionCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  promotionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 16,
    color: "gray",
  },
  copiedMessage: {
    color: "green",
    marginTop: 5,
  },
  promoCodeContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "darkgreen",
    borderStyle: "dashed",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  promoCode: {
    color: "darkgreen",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InclusivePromotionsScreen;
