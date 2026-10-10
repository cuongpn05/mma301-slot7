import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingSpinner() {
  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
