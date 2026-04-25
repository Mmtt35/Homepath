import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";

import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [listings, setListings] = useState([]);
  const [selectedHome, setSelectedHome] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");

  // 🔥 Mock data
  useEffect(() => {
    setListings([
      {
        id: 1,
        price: 200000,
        beds: 3,
        baths: 2,
        address: "123 Main St, Mandeville",
        image: "https://via.placeholder.com/400x250",
      },
    ]);
  }, []);

  const handleSubmit = async () => {
    if (!name || !phone || !budget) {
      Alert.alert("Missing Info", "Please fill out all fields");
      return;
    }

    try {
      await addDoc(collection(db, "leads"), {
        name,
        phone,
        budget,
        createdAt: new Date(),
      });

      Alert.alert("Success", "You're pre-approved 🎉");

      setName("");
      setPhone("");
      setBudget("");
      setShowForm(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  // 📝 PRE-APPROVAL FORM
  if (showForm) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.inner}>

          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />

          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="#94a3b8"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Phone"
            placeholderTextColor="#94a3b8"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <TextInput
            placeholder="Enter Budget"
            placeholderTextColor="#94a3b8"
            value={budget}
            onChangeText={setBudget}
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowForm(false)}>
            <Text style={{ color: "#94a3b8", marginTop: 20 }}>← Back</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // 🏡 PROPERTY DETAILS
  if (selectedHome) {
    const monthly = Math.round(
      (selectedHome.price * 0.95 * 0.065 / 12) /
        (1 - Math.pow(1 + 0.065 / 12, -360)) +
      (selectedHome.price * 0.012 / 12) +
      150
    );

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
        <ScrollView>

          <Image source={{ uri: selectedHome.image }} style={{ width: "100%", height: 250 }} />

          <View style={{ padding: 20 }}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              ${selectedHome.price.toLocaleString()}
            </Text>

            <Text style={{ color: "#94a3b8", marginTop: 5 }}>
              {selectedHome.address}
            </Text>

            <Text style={{ color: "#cbd5f5", marginTop: 10 }}>
              {selectedHome.beds} beds • {selectedHome.baths} baths
            </Text>

            <View style={{
              backgroundColor: "#1e40af",
              padding: 20,
              borderRadius: 20,
              marginTop: 25
            }}>
              <Text style={{ color: "#c7d2fe" }}>Estimated Monthly</Text>
              <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
                ${monthly}/mo
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowForm(true)}
            >
              <Text style={styles.buttonText}>Get Pre-Approved</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelectedHome(null)}>
              <Text style={{ color: "#94a3b8", marginTop: 20 }}>
                ← Back to listings
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  }

  // 🏠 LISTINGS
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "bold" }}>
          Discover Homes
        </Text>

        {listings.map(home => (
          <TouchableOpacity
            key={home.id}
            onPress={() => setSelectedHome(home)}
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 20,
              marginTop: 20,
              overflow: "hidden",
            }}
          >
            <Image source={{ uri: home.image }} style={{ width: "100%", height: 180 }} />

            <View style={{ padding: 16 }}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                ${home.price.toLocaleString()}
              </Text>

              <Text style={{ color: "#94a3b8" }}>
                {home.address}
              </Text>

              <Text style={{ color: "#cbd5f5" }}>
                {home.beds} beds • {home.baths} baths
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0f172a",
  },
  inner: {
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  input: {
    backgroundColor: "#1e293b",
    color: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
