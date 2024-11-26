import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const FlightInfo = ({ flightInfo }) => {
  return (
    <View style={styles.container}>
        <View style={styles.flightContainer}>
        <View style={styles.flightText}>
        <Image
          source={require("@/assets/icons/flight.png")}
          style={styles.logoImg}
        />
        <Text style={styles.title}>Flights</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Book Here</Text>
      </TouchableOpacity>
        </View>
      
      <Text style={styles.airline}>Airline: Indigo</Text>
      <Text style={styles.airline}>Price: ${flightInfo[0]?.price}</Text>
      <Text style={styles.airlineInfo}>Arrival Airport: {flightInfo[0]?.arrivalAirport}</Text>
      <Text style={styles.airlineInfo}>Arrival Date: {flightInfo[0]?.arrivalDate}</Text>
      <Text style={styles.airlineInfo}>Departure Date: {flightInfo[0]?.departureDate}</Text>
    </View>
  );
};

export default FlightInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY
  },
  flightContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: 'space-between',

  },
  flightText: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    marginTop: 4,
  },
  logoImg: {
    width: 24,
    height: 24,
    objectFit: "cover",
    marginRight: 8,
    marginTop: 5,
  },
  airline: {
    color: Colors.GRAY,
    fontFamily: "outfit-medium",
    fontSize: 18,
    marginTop: 2,
  },
  airlineInfo: {
    color: Colors.GRAY,
    fontFamily: "outfit",
    fontSize: 14,
    marginTop: 2,
  },
  button: {
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
    width: 100,
    justifyContent: 'center'
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit",
    fontSize: 15,
  },
});
