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
import { budgetOptions } from "@/constants/Options";
import OptionCard from "@/components/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";

const SelectBudget = () => {
  const [selectedBudget, setSelectedBudget] = useState();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const navigation = useNavigation();
  const router = useRouter();

  const onBudgetSelectionContinue = () => {
    if (!selectedBudget) {
      ToastAndroid.show("Please choose your budget", ToastAndroid.LONG);
      return;
    }

    if (selectedBudget) {
      setTripData({
        ...tripData,
        budget: selectedBudget.title,
      });
      router.push("/review-trip");
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
      <Text style={styles.title}>Budget</Text>
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 22,
          }}
        >
          Choose spending hobits for your trip
        </Text>
      </View>
      <FlatList
        data={budgetOptions}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedBudget(item)}
          >
            <OptionCard item={item} selectedTraveler={selectedBudget} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={styles.btn} onPress={onBudgetSelectionContinue}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectBudget;

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
