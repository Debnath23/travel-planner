import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

const TripPlan = ({ planInfo }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏕️ Plan Details</Text>
      <View>
        {planInfo?.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.textContainer}>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}
              >
                Day: {item?.day}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  color: Colors.GRAY,
                  fontSize: 18,
                }}
              >
                {item?.date}
              </Text>
            </View>

            <View>
              {item?.activities.map((activity, index) => (
                <View
                  key={index}
                  style={{
                    marginVertical: 5,
                    backgroundColor: "#D4EBF8",
                    padding: 10,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: Colors.GRAY,
                  }}
                >
                  <Image
                    source={require("@/assets/images/activity.jpg")}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 15,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                        color: Colors.PRIMARY,
                        fontSize: 18,
                        marginTop: 10,
                      }}
                    >
                      {activity?.time}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit-medium",
                        color: Colors.GRAY,
                        fontSize: 17,
                      }}
                    >
                      {activity?.activity}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                        color: Colors.GRAY,
                        fontSize: 15,
                        marginVertical: 5,
                      }}
                    >
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Natus, ex consequuntur nobis recusandae sunt maxime
                      incidunt dolorum magni provident maiores.
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginRight: 11,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: "outfit",
                            color: Colors.GRAY,
                            fontSize: 15,
                            marginTop: 2.5,
                          }}
                        >
                          🎟️ Ticket Price:{" "}
                          <Text style={{ color: Colors.PRIMARY }}>Free</Text>
                        </Text>

                        <Text
                          style={{
                            fontFamily: "outfit",
                            color: Colors.GRAY,
                            fontSize: 15,
                          }}
                        >
                          ⏱️ Time to travel:{" "}
                          <Text style={{ color: Colors.PRIMARY }}>2 hour</Text>
                        </Text>
                      </View>
                      <Ionicons
                        name="navigate"
                        size={20}
                        color="white"
                        style={{
                          backgroundColor: Colors.PRIMARY,
                          padding: 5,
                          width: 30,
                          borderRadius: 9,
                        }}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TripPlan;

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
    marginVertical: 10,
    height: "auto",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
