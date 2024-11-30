import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const HotelList = ({ hotelInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏨 Hotel Recomendation</Text>
      <FlatList
        style={styles.itemContainer}
        data={hotelInfo}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.hotelCard}>
            <Image
              source={require("@/assets/images/hotel.jpg")}
              style={styles.img}
            />
            <View style={styles.content}>
              <Text style={styles.hotelName}>
                {item?.hotelName || "Hyatt Regency"}
              </Text>
              <Text style={styles.desc}>
                {item?.description ||
                  "Hyatt Regency, known for its comfortable rooms and excellent service."}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.hotelText}>⭐ {item.rating}</Text>
                <Text style={styles.hotelText}>💰 {item.pricePerNight}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HotelList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  itemContainer: {
    marginVertical: 20,
  },
  hotelCard: {
    width: 320,
    marginRight: 10,
  },
  img: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
  content: {
    padding: 10,
    borderRadius: 10,
  },
  hotelName: {
    fontFamily: "outfit-bold",
    fontSize: 20,
    color: Colors.GRAY,
    marginBottom: 2,
  },
  desc: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: Colors.GRAY,
    lineHeight: 22,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  hotelText: {
    fontFamily: "outfit",
    color: Colors.GRAY,
  },
});
