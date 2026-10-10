import { Stack } from "expo-router";

// Khai báo hai màn hình của ứng dụng.
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tin tức" }} />
      <Stack.Screen name="detail" options={{ title: "Chi tiết" }} />
    </Stack>
  );
}
