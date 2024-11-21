import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import UserTripCard from "@/components/UserTripCard";

const UserTripList = ({ userTrips }) => {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View>
        {userTrips[0]?.locationInfo?.photoRef ? (
          <Image
            source={{
              uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${userTrips[0]?.locationInfo?.photoRef}&key=${process.env.EXPO_PUBLIC_GO_MAPS_API_KEY}`,
            }}
            style={styles.img}
          />
        ) : (
          <Image
            source={require("@/assets/images/travel.jpg")}
            style={styles.img}
          />
        )}
        <View style={styles.content}>
          <Text style={styles.destination}>
            {userTrips[0]?.tripDetails.destination}
          </Text>
          <View style={styles.textContent}>
            <Text style={styles.startDate}>21 NOV 2024</Text>
            <View style={styles.travelerContainer}>
              <Image
                source={require("@/assets/icons/holiday-trip.png")}
                style={styles.logoImg}
              />
              <Text style={styles.traveler}>Just Me</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>See your detailed plan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherTripsContainer}>
          {userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserTripList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: Colors.WHITE,
  },
  img: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 15,
  },
  content: {
    marginTop: 6,
    paddingHorizontal: 5,
  },
  destination: {
    fontSize: 18,
    fontFamily: "outfit-medium",
  },
  textContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 1,
  },
  startDate: {
    fontSize: 15,
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
    fontSize: 15,
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
  button: {
    padding: 15,
    backgroundColor: "#BCECE0",
    borderRadius: 9,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
  otherTripsContainer: {
    marginTop: 15,
  },
});
