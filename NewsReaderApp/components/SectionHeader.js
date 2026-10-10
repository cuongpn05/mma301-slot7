import { Text, View } from "react-native";

export default function SectionHeader({ title }) {
  return (
    <View style={{ padding: 10, backgroundColor: "#f4f4f4" }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>{title}</Text>
    </View>
  );
}
