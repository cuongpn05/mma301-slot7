import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { TodoProvider } from "./contexts/TodoContext";

export default function App() {
  return (
    <TodoProvider>
      <HomeScreen />
    </TodoProvider>
  );
}
