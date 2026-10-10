import React, { createContext, useReducer, useEffect } from "react";

import { loadTodos, saveTodos } from "../services/storageService";

const initialState = {
  todos: [],
  loading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
}

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const todos = await loadTodos();

      dispatch({
        type: "SET_TODOS",
        payload: todos,
      });
    })();
  }, []);

  useEffect(() => {
    if (!state.loading) {
      saveTodos(state.todos);
    }
  }, [state.todos, state.loading]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
