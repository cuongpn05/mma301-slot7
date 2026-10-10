import React, { useContext, useState, useCallback } from "react";

import { FlatList, View, Text, RefreshControl } from "react-native";

import { TodoContext } from "../contexts/TodoContext";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #fff;
`;

export default function HomeScreen() {
  const { state, dispatch } = useContext(TodoContext);

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;

  const onAddTodo = (values) => {
    const newTodo = {
      id: Date.now().toString(),
      text: values.text,
    };

    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
  };

  const onDeleteTodo = (id) => {
    dispatch({
      type: "DELETE_TODO",
      payload: id,
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const pagedTodos = state.todos.slice(0, page * PAGE_SIZE);

  const loadMore = () => {
    if (pagedTodos.length < state.todos.length) {
      setPage((prev) => prev + 1);
    }
  };

  if (state.loading) {
    return (
      <Container>
        <Text
          style={{
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Đang tải...
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <TodoForm onSubmit={onAddTodo} />

      <FlatList
        data={pagedTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem todo={item} onDelete={onDeleteTodo} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
}
