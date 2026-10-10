import { CATEGORIES } from "../constants/categories";

const API_KEY = "e4e82950b6f0480c916a142ee42d47ba";
const BASE_URL = "https://newsapi.org/v2";

// Dùng chung một hàm gọi API cho tải lần đầu và tải thêm.
async function fetchArticles(category, page) {
  const res = await fetch(
    `${BASE_URL}/top-headlines?category=${category}&country=us&page=${page}&apiKey=${API_KEY}`,
  );
  const json = await res.json();

  // API báo lỗi thì dừng lại; HomeScreen sẽ hiển thị thông báo.
  if (!res.ok || json.status !== "ok") {
    throw new Error(json.message || "Không thể tải tin tức.");
  }
  if (!Array.isArray(json.articles)) {
    throw new Error("API không trả về danh sách bài viết.");
  }
  return json.articles.filter((article) => article && article.title && article.url);
}

export async function fetchNewsByCategory() {
  const sections = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const articles = await fetchArticles(cat, 1);

      return {
        title: cat.toUpperCase(),
        data: articles,
      };
    }),
  );

  return sections;
}

export async function fetchMoreNews(category, page = 2) {
  return fetchArticles(category, page);
}
