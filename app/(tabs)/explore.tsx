import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Header */}
      <Text style={styles.title}>🔍 Explore</Text>
      <Text style={styles.subtitle}>Search homes your way</Text>

      {/* Search Bar */}
      <TextInput
        placeholder="Search by city, zip, or address"
        placeholderTextColor="#94a3b8"
        style={styles.search}
      />

      {/* Filters */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Filters</Text>

        <TextInput
          placeholder="Min Price"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          placeholder="Max Price"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          placeholder="Beds"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />
      </View>

      {/* Future Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Coming Soon</Text>
        <Text style={styles.text}>
          Map search, saved homes, AI recommendations 🚀
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0f172a",
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },

  subtitle: {
    color: "#94a3b8",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  text: {
    color: "#cbd5f5",
  },
});
