import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { userTrip } from "@/constants/Options";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/config/firebaseConfig";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import UserTripList from '@/components/UserTripList'

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const getMyTrips = async () => {
    try {
      setUserTrips([]);
      setLoading(true);

      const dbquery = query(
        collection(db, "UserTrip"),
        where("userEmail", "==", user?.email)
      );
      const querySnapshot = await getDocs(dbquery);

      querySnapshot.forEach((doc) => {
        setUserTrips((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      ToastAndroid.show("Opps! Something went worng.", ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyTrips();
  }, [user]);

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: Colors.WHITE
      }}
    >
      {loading && <ActivityIndicator size={"large"} color={Colors.PRIMARY} />}
      <View style={styles.label}>
        <Text style={styles.labelText}>My Trips</Text>
        <TouchableOpacity onPress={() => router.push("/search-place")}>
          <Ionicons name="add-circle" size={43} color="black" />
        </TouchableOpacity>
      </View>
      {userTrips?.length !== 0 ? (
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
        <UserTripList userTrips={userTrip} />
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
