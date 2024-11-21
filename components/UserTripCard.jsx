import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const UserTripCard = ({ trip }) => {
  return (
    <View style={styles.container}>
      <Image source={trip?.img} style={styles.img} />
      <View>
        <Text style={styles.destination}>{trip?.tripDetails?.destination}</Text>
        <Text style={styles.startDate}>21 NOV 2024 </Text>
        <Text style={styles.traveler}>Journey: Just Me</Text>
        <Text style={styles.budget}>Budget: Luxury</Text>
      </View>
    </View>
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
    color: Colors.GRAY
  }
});
