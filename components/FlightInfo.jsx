import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const FlightInfo = ({ flightInfo }) => {
  return (
    <View style={styles.container}>
      <View style={styles.flightText}>
        <Image
          source={require("@/assets/icons/flight.png")}
          style={styles.logoImg}
        />
        <Text style={styles.title}>Flights</Text>
      </View>
      <View
        style={{
          backgroundColor: "#D4EBF8",
          padding: 15,
          borderRadius: 15,
          borderWidth: 1,
          borderColor: Colors.GRAY,
        }}
      >
        <Text style={styles.airline}>Airline: Indigo</Text>
        <Text style={styles.price}>Price: ${flightInfo[0]?.price}</Text>
        <Text style={styles.airlineInfo}>
          Arrival Airport: {flightInfo[0]?.arrivalAirport}
        </Text>
        <Text style={styles.airlineInfo}>
          Arrival Date: {flightInfo[0]?.arrivalDate}
        </Text>
        <Text style={styles.airlineInfo}>
          Departure Date: {flightInfo[0]?.departureDate}
        </Text>
        <View style={styles.flightContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Book Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FlightInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flightContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  flightText: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 5,
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
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
    fontSize: 20,
    marginTop: 2,
  },
  price: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
  airlineInfo: {
    color: Colors.GRAY,
    fontFamily: "outfit",
    fontSize: 15,
    marginTop: 2,
  },
  button: {
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
    width: 100,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit",
    fontSize: 15,
  },
});
