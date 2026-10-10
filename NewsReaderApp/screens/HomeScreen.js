import { SectionList, ActivityIndicator, View, Text, Button } from "react-native";
import { useEffect, useRef, useState } from "react";
import { fetchNewsByCategory, fetchMoreNews } from "../services/newsApi";
import NewsItem from "../components/NewsItem";
import SectionHeader from "../components/SectionHeader";
import { CATEGORIES } from "../constants/categories";

// Mỗi chuyên mục bắt đầu từ trang 1.
function createFirstPages() {
  const pages = {};
  for (const category of CATEGORIES) {
    pages[category] = 1;
  }
  return pages;
}

export default function HomeScreen() {
  const [sections, setSections] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageMap, setPageMap] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  // Khóa ngay khi bắt đầu gọi API để tránh tải nhiều lần cùng lúc.
  const isFetching = useRef(false);

  async function loadNews() {
    if (isFetching.current) return;
    isFetching.current = true;
    try {
      const data = await fetchNewsByCategory();
      setError("");
      setSections(data);

      setPageMap(createFirstPages());
      setHasMore(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải tin tức.");
    } finally {
      // Thành công hay thất bại đều phải tắt loading.
      isFetching.current = false;
      setLoading(false);
      setRefreshing(false);
    }
  }

  const loadMore = async (category) => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;
    setLoadingMore(true);
    setError("");

    const nextPage = (pageMap[category] || 1) + 1;
    try {
      const moreArticles = await fetchMoreNews(category, nextPage);
      if (moreArticles.length === 0) {
        setHasMore(false);
        return;
      }

      setSections((oldSections) => {
        return oldSections.map((section) => {
          if (section.title.toLowerCase() !== category) return section;

          // Không thêm lại bài đã có trong danh sách.
          const newArticles = moreArticles.filter((article) => {
            return !section.data.some((oldArticle) => oldArticle.url === article.url);
          });
          return { ...section, data: [...section.data, ...newArticles] };
        });
      });

      // Chỉ tăng số trang khi tải thành công.
      setPageMap((oldPages) => ({ ...oldPages, [category]: nextPage }));

    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải thêm tin tức.");
    } finally {
      isFetching.current = false;
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    // [] nghĩa là tải tin lần đầu khi mở màn hình.
    let active = true;
    isFetching.current = true;
    fetchNewsByCategory()
      .then((data) => {
        if (!active) return;
        setSections(data);
        setPageMap(createFirstPages());
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : "Không thể tải tin tức.");
      })
      .finally(() => {
        if (!active) return;
        isFetching.current = false;
        setLoading(false);
      });
    // Không cập nhật màn hình nếu người dùng đã rời khỏi màn hình này.
    return () => { active = false; };
  }, []);

  function refreshNews() {
    if (isFetching.current) return;
    setError("");
    setRefreshing(true);
    loadNews();
  }

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => item.title + index}
      renderItem={({ item }) => <NewsItem article={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <SectionHeader title={title} />
      )}
      refreshing={refreshing}
      onRefresh={refreshNews}
      ListHeaderComponent={error ? (
        <View style={{ padding: 16 }}>
          <Text>{error}</Text>
          <Button title="Thử lại" onPress={refreshNews} />
        </View>
      ) : null}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        const lastCategory = sections[sections.length - 1]?.title.toLowerCase();

        if (lastCategory && !error) {
          loadMore(lastCategory);
        }
      }}
      ListEmptyComponent={
        <View style={{ padding: 20 }}>
          {loading ? <ActivityIndicator /> : <Text>Không có dữ liệu.</Text>}
        </View>
      }
      ListFooterComponent={
        loadingMore ? (
          <ActivityIndicator style={{ marginVertical: 16 }} />
        ) : null
      }
    />
  );
}
