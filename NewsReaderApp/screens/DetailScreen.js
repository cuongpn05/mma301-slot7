import { Text, Image, ScrollView, Linking, Button, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
  // Đọc thông tin mà NewsItem gửi sang.
  const article = useLocalSearchParams();

  if (typeof article.title !== "string") {
    return <Text style={{ padding: 16 }}>Không tìm thấy bài viết.</Text>;
  }

  async function openOriginalArticle() {
    try {
      if (typeof article.url !== "string" || !/^https?:\/\//i.test(article.url)) {
        throw new Error("Đường dẫn bài viết không hợp lệ.");
      }
      await Linking.openURL(article.url);
    } catch {
      Alert.alert("Lỗi", "Không thể mở bài viết. Vui lòng thử lại.");
    }
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {typeof article.urlToImage === "string" && article.urlToImage !== "" && (
        <Image
          source={{ uri: article.urlToImage }}
          style={{ height: 200, borderRadius: 10 }}
        />
      )}

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginVertical: 10,
        }}
      >
        {article.title}
      </Text>

      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        {typeof article.description === "string" ? article.description : ""}
      </Text>

      <Button
        title="Xem bài gốc"
        onPress={openOriginalArticle}
      />
    </ScrollView>
  );
}
