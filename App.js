import React from "react";
import { 
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,


} from "react-native";

const { width : SCREEN_WIDTH } = Dimensions.get("window");
// console.log(SCREEN_WIDTH);

export default function App() {
  return(
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>

        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "teal",
  },

  city: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },

  weather: {
    backgroundColor: "blue",
  },

  day: {
    width : SCREEN_WIDTH,
    alignItems: "center",
  
  },

  temp:{
    fontSize: 180,
    marginTop: 50,
  },

  desc: {
    fontSize: 60,
    marginTop: -30,
  },
})