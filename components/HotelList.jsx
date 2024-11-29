import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const HotelList = ({ hotelInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hotel Recomendation</Text>
      <FlatList
        style={styles.itemContainer}
        data={hotelInfo}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Image
              source={require("@/assets/images/hotel.jpg")}
              style={styles.img}
            />
            <View style={styles.content}>
              <Text style={styles.hotelName}>
                {item?.hotelName || "Hyatt Regency"}
              </Text>
              <Text style={styles.desc}>
                {item?.description || "Hyatt Regency"}
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
    height: "auto",
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  itemContainer: {
    marginVertical: 20,
    marginRight: 10,
    height: 'auto',
    
  },
  img: {
    width: 320,
    height: 180,
    objectFit: "cover",
    borderRadius: 15,
  },
  content: {
    paddingHorizontal: 5,
  },
  hotelName: {
    fontFamily: "outfit-bold",
    color: Colors.GRAY,
    fontSize: 20,
    paddingTop: 5,
  },
  desc: {
    fontFamily: "outfit-medium",
    color: Colors.GRAY,
    fontSize: 17,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hotelText: {
    fontFamily: "outfit",
    color: Colors.GRAY,
  }
});
