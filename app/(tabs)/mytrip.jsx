import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();

  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View style={styles.label}>
        <Text style={styles.labelText}>My Trips</Text>
        <Ionicons name="add-circle" size={43} color="black" />
      </View>
      {userTrips?.length === 0 ? (
        <View style={styles.container}>
          <Ionicons
            name="location-sharp"
            size={30}
            color="black"
            style={styles.icons}
          />
          <Text style={styles.title}>No Trips Planned Yet</Text>
          <Text style={styles.subtitle}>
            Looks like it’s time to plan a new travel experience! Get started
            below.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/search-place")}
          >
            <Text style={styles.buttonText}>Start a New Trip</Text>
          </TouchableOpacity>
        </View>
      ) : (
        userTrips.map((trip) => <View>trip</View>)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
  icons: {
    marginBottom: 15,
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
  },
  labelText: {
    fontFamily: "outfit-bold",
    fontSize: 35,
  },
  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 30,
    color: Colors.GRAY,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 9,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "outfit",
  },
});
