import AsyncStorage from "@react-native-async-storage/async-storage";

const TODO_KEY = "TODO_LIST";

export async function saveTodos(todos) {
  try {
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error("Lỗi lưu dữ liệu:", e);
  }
}

export async function loadTodos() {
  try {
    const json = await AsyncStorage.getItem(TODO_KEY);

    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Lỗi đọc dữ liệu:", e);
    return [];
  }
}
