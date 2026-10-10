import { Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function NewsItem({ article }) {
  // Gửi thông tin bài viết sang màn hình chi tiết.
  function openDetail() {
    router.push({
      pathname: "/detail",
      params: {
        title: article.title,
        description: article.description || "",
        urlToImage: article.urlToImage || "",
        url: article.url,
      },
    });
  }

  return (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={openDetail}
    >
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={{ height: 150, borderRadius: 8 }}
        />
      )}

      <Text style={{ fontWeight: "bold", marginTop: 8 }}>{article.title}</Text>
    </TouchableOpacity>
  );
}
