import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom-width: 1px;
  border-color: #ddd;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TodoText = styled.Text`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

const DeleteButton = styled.TouchableOpacity`
  padding: 5px 10px;
  background-color: #ff4d4d;
  border-radius: 4px;
`;

const DeleteText = styled.Text`
  color: white;
  font-weight: bold;
`;

function TodoItem({ todo, onDelete }) {
  return (
    <Container>
      <TodoText>{todo.text}</TodoText>

      <DeleteButton onPress={() => onDelete(todo.id)}>
        <DeleteText>Xóa</DeleteText>
      </DeleteButton>
    </Container>
  );
}

export default React.memo(TodoItem);
