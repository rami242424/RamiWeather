import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text, ScrollView, } from "react-native";

export default function App() {
  return(
    <View style={styles.container}>
      <StatusBar style="light"/>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView style={styles.weather}>
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
  container : {
    flex: 1, backgroundColor: "tomato"
  },

  city: {
    flex: 1.2,
    // backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center"
  },

  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },

  weather: {
    flex: 3,
    // backgroundColor: "red"
  },

  day: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "teal",
  },

  temp: {
    fontSize: 170,
    marginTop: 50,

  },

  desc: {
    fontSize: 60,
    marginTop: -30,
  },
})