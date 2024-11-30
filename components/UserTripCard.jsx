import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

const UserTripCard = ({ trip }) => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() =>
      router.push({
        pathname: "/trip-details",
        params: { trip: JSON.stringify(trip) },
      })
    }>
      <View style={styles.container}>
        {!trip?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${trip?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GO_MAPS_API_KEY}`,
            }}
            style={styles.img}
          />
        ) : (
          <Image
            source={require("@/assets/images/travel.jpg")}
            style={styles.img}
          />
        )}
        <View>
          <Text style={styles.destination}>{trip?.locationInfo?.name}</Text>
          <Text style={styles.startDate}>{trip?.statDate}</Text>
          <Text style={styles.traveler}>Journey: {trip?.traveler}</Text>
          <Text style={styles.budget}>Budget: {trip?.budget}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 14,
    marginHorizontal: 5,
    backgroundColor: Colors.WHITE,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  img: {
    width: 100,
    height: 100,
    objectFit: "cover",
    borderRadius: 15,
    marginRight: 10,
  },
  destination: {
    fontSize: 16,
    fontFamily: "outfit-medium",
  },
  startDate: {
    fontSize: 13,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  travelerContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  logoImg: {
    width: 24,
    height: 24,
    objectFit: "cover",
    marginRight: 5,
  },
  traveler: {
    fontSize: 14,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  budget: {
    fontSize: 13,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
});
