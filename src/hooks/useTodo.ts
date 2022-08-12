import { useState } from 'react';
import todoController from 'src/api/todoController';
import { TodoResponse } from 'src/types/TodoResponse';

const useTodo = () => {
  const [todo, setTodo] = useState<TodoResponse | null>(null);
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const handleFetchTodos = (fetchedTodos: TodoResponse[]) => {
    setTodos(
      fetchedTodos.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
      )
    );
    setIsLoading(false);
  };

  const handleFetchTodo = (fetchedTodo: TodoResponse) => {
    setTodo(fetchedTodo);
  };

  const handleCreateTodo = (createdTodo: TodoResponse) => {
    setTodos([createdTodo, ...todos]);
  };

  const handleUpdateTodo = (updatedTodo: TodoResponse) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === updatedTodo.id ? updatedTodo : prevTodo
      )
    );
  };

  const handleDeleteTodo = (todoId: string) => {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo) => prevTodo.id !== todoId)
    );
  };

  const handleTodoError = (error: Error) => {
    alert(error.message);
    setIsError(true);
  };

  const getTodos = () => {
    todoController
      .getTodos()
      .then(handleFetchTodos)
      .catch(handleTodoError)
      .finally(() => setIsLoading(false));
  };

  const getTodosById = (todoId: string) => {
    todoController
      .getTodosById(todoId)
      .then(handleFetchTodo)
      .catch(handleTodoError);
  };

  const createTodo = (title: string, content: string) => {
    todoController
      .createTodo(title, content)
      .then(handleCreateTodo)
      .catch(handleTodoError);
  };

  const updateTodo = (id: string, title: string, content: string) => {
    todoController
      .updateTodo(id, title, content)
      .then(handleUpdateTodo)
      .catch(handleTodoError);
  };

  const deleteTodo = (id: string) => {
    todoController
      .deleteTodo(id)
      .then(() => handleDeleteTodo(id))
      .catch(handleTodoError);
  };

  return {
    todo,
    todos,
    isLoading,
    isError,
    getTodos,
    getTodosById,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};
export default useTodo;
