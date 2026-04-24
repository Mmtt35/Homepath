import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function HomeScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = async () => {
    console.log("BUTTON PRESSED");

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

      // clear inputs
      setName("");
      setPhone("");
      setBudget("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.inner}>

        {/* Title */}
        <Text style={styles.title}>🏡 HomePath</Text>
        <Text style={styles.subtitle}>Find Your Dream Home</Text>

        {/* Inputs */}
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Budget"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
          style={styles.input}
        />

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Get Pre-Approved</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  inner: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a3c6e",
    marginBottom: 5,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
