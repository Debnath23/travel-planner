import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import { TravelerOptions } from "@/constants/Options";
import OptionCard from "@/components/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";

const SelectTraveler = () => {
  const [selectedTraveler, setSelectedTraveler] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();

  const onTravelerSelectionContinue = () => {
    if (!selectedTraveler) {
      ToastAndroid.show("Please select traveler", ToastAndroid.LONG);
      return;
    }

    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler,
      });
      router.push("/select-date");
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,
      headerShown: true,
    });
  }, [navigation]);

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
        data={TravelerOptions}
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

      <TouchableOpacity
        style={styles.btn}
        onPress={onTravelerSelectionContinue}
      >
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
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
  btn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 9,
    marginHorizontal: 5,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-medium",
    fontSize: 17,
  },
});
