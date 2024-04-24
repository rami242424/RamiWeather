import React from "react";
import { View } from "react-native";

export default function App() {
  return(
    <View>
      <View style={{ width: 200, height: 200, backgroundColor: "tomato"}}></View>
      <View style={{ width: 200, height: 200, backgroundColor: "green"}}></View>
      <View style={{ width: 200, height: 200, backgroundColor: "orange"}}></View>
    </View>
  );
}