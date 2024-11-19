import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { options } from "@/constants/Options";
import OptionCard from "@/components/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";

const SelectTraveler = () => {
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

  useEffect(() => {
    setTripData({
      ...tripData,
      traveler: selectedTraveler,
    });
    console.log(tripData);
    
  }, [selectedTraveler]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's Traveling</Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 22,
          }}
        >
          Choose your traveler
        </Text>
      </View>
      <FlatList
        data={options}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedTraveler(item)}
          >
            <OptionCard item={item} selectedTraveler={selectedTraveler} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default SelectTraveler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 85,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 35,
    fontFamily: "outfit-bold",
    marginBottom: 10,
  },
});
