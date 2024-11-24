import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import UserTripList from "@/components/UserTripList";
import axiosInstance from "@/config/axiosInstance";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getMyTrips = async () => {
      try {
        setUserTrips([]);
        setLoading(true);

        const response = await axiosInstance.get("/trip");

        if (response.status === 200) {
          setUserTrips(response.data.trips || response.data);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
        ToastAndroid.show("Oops! Something went wrong.", ToastAndroid.LONG);
      } finally {
        setLoading(false);
      }
    };

    getMyTrips();
  }, []);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE,
      }}
    >
      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      <View style={styles.label}>
        <Text style={styles.labelText}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push("/search-place")}>
          <Ionicons name="add-circle" size={43} color="black" />
        </TouchableOpacity>
      </View>
      {userTrips?.length == 0 ? (
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
        <UserTripList userTrips={userTrips} />
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
