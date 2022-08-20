import { useState } from 'react';
import todoController from 'src/api/todoController';
import { TodoResponse } from 'src/types/TodoResponse';

const useTodo = () => {
  const [todo, setTodo] = useState<TodoResponse | null>(null);
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState(false);

  const handleFetchTodos = (fetchedTodos: TodoResponse[]) => {
    setTodos(fetchedTodos);
  };

  const handleFetchTodo = (fetchedTodo: TodoResponse) => {
    setTodo(fetchedTodo);
  };

  const handleTodoError = () => {
    setIsError(true);
  };

  const getTodos = () => {
    setIsLoading(true);
    todoController
      .getTodos()
      .then(handleFetchTodos)
      .catch(handleTodoError)
      .finally(() => setIsLoading(false));
  };

  const getTodosById = ({ id }: TodoResponse) => {
    todoController.getTodosById({ id }).then(handleFetchTodo).catch(handleTodoError);
  };

  const createTodo = (todoItem: Pick<TodoResponse, 'todo'>) => {
    todoController.createTodo(todoItem).then(getTodos).catch(handleTodoError);
  };

  const updateTodo = (todoItem: Pick<TodoResponse, 'id' | 'todo' | 'isCompleted'>) => {
    todoController.updateTodo(todoItem).then(getTodos).catch(handleTodoError);
  };

  const deleteTodo = (todoItem: Pick<TodoResponse, 'id'>) => {
    todoController.deleteTodo(todoItem).then(getTodos).catch(handleTodoError);
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
