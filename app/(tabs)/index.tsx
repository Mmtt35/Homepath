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
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");

  // 🔥 FETCH HOMES
  useEffect(() => {
    const fetchHomes = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          "https://api.realtyapi.io/v1/properties?location=Mandeville,LA",
          {
            headers: {
              "x-api-key": "rt_4qSHaG4OQ4zPDWXKJ9PKEgVE",
            },
          }
        );

        const data = await res.json();
        console.log("API DATA:", data);

        let homesArray = [];

        // Handle single property
        if (data.propertyDetails) {
          homesArray = [data.propertyDetails];
        } else {
          homesArray =
            data.results ||
            data.properties ||
            data.listings ||
            data.data ||
            [];
        }

        const safeArray = Array.isArray(homesArray) ? homesArray : [];

        const formatted = safeArray.map((home, index) => ({
          id: index,

          price:
            home.price ||
            home.listPrice ||
            home.zestimate ||
            (home.affordabilityEstimate?.totalMonthlyCost
              ? home.affordabilityEstimate.totalMonthlyCost * 300
              : 250000),

          beds: home.bedrooms || home.beds || 3,
          baths: home.bathrooms || home.baths || 2,

          address:
            home.address ||
            home.streetAddress ||
            (home.city && home.state
              ? `${home.city}, ${home.state}`
              : "Mandeville, LA"),

          image:
            home.imgSrc ||
            home.photo ||
            home.thumbnail ||
            `https://source.unsplash.com/400x250/?house,${index}`,
        }));

        console.log("FORMATTED:", formatted);

        // Fallback so UI never empty
        if (formatted.length === 0) {
          setListings([
            {
              id: 1,
              price: 325000,
              beds: 3,
              baths: 2,
              address: "Mandeville, LA",
              image: "https://source.unsplash.com/400x250/?house",
            },
          ]);
        } else {
          setListings(formatted);
        }
      } catch (err) {
        console.log("API ERROR:", err);

        // fallback on error
        setListings([
          {
            id: 1,
            price: 300000,
            beds: 3,
            baths: 2,
            address: "Mandeville, LA",
            image: "https://source.unsplash.com/400x250/?house",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomes();
  }, []);

  // 🔥 SUBMIT LEAD
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

  // 📝 FORM
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

  // 🏡 DETAILS
  if (selectedHome) {
    const monthly = Math.round(
      (selectedHome.price * 0.95 * 0.065) / 12 /
        (1 - Math.pow(1 + 0.065 / 12, -360)) +
        (selectedHome.price * 0.012) / 12 +
        150
    );

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
        <ScrollView>
          <Image
            source={{ uri: selectedHome.image }}
            style={{ width: "100%", height: 250 }}
          />

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

            <View
              style={{
                backgroundColor: "#1e40af",
                padding: 20,
                borderRadius: 20,
                marginTop: 25,
              }}
            >
              <Text style={{ color: "#c7d2fe" }}>Estimated Monthly</Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
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

        {loading ? (
          <Text style={{ color: "white", marginTop: 20 }}>
            Loading homes...
          </Text>
        ) : listings.length === 0 ? (
          <Text style={{ color: "#94a3b8", marginTop: 20 }}>
            No homes found
          </Text>
        ) : (
          listings.map((home) => (
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
              <Image
                source={{ uri: home.image }}
                style={{ width: "100%", height: 180 }}
              />

              <View style={{ padding: 16 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
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
          ))
        )}
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
