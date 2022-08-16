import { useEffect, useState } from 'react';
import todoController from 'src/api/todoController';
import { createDummyTodo } from 'src/utils/todoDummy';
import {
  TodoResponse,
  CreateTodo,
  UpdateTodo,
  MutateTodo,
  RemoveTodo,
} from 'src/types/Todo';
import { useQuery, useMutation, useQueryClient } from 'react-query';

type optimisticFunction = (
  old: TodoResponse[],
  value: TodoResponse
) => TodoResponse[];

const useTodo = () => {
  const queryClient = useQueryClient();
  const [sortedTodos, setSortedTodos] = useState<TodoResponse[]>([]);
  const { data, isError, isLoading } = useQuery(
    'todos',
    todoController.getTodos
  );

  const create: optimisticFunction = (prev, cur) => [...prev, cur];
  const update: optimisticFunction = (prev, cur) =>
    prev.map((todo) => (todo.id === cur.id ? cur : todo));
  const remove: optimisticFunction = (prev, cur) =>
    prev.filter((todo) => todo.id !== cur.id);

  const handleMutation = async (
    mutateTodo: MutateTodo,
    optimisticFunction: optimisticFunction
  ) => {
    await queryClient.cancelQueries('todos');

    const dummyTodo = createDummyTodo(mutateTodo);
    const previousTodos = queryClient.getQueryData<TodoResponse[]>(['todos']);
    queryClient.setQueryData<TodoResponse[]>('todos', (_previousTodos) =>
      optimisticFunction(_previousTodos, dummyTodo)
    );
    return { previousTodos };
  };

  const { mutate: createTodo } = useMutation(
    (createTodo: CreateTodo) => todoController.createTodo(createTodo),
    {
      onMutate: (createTodo) => handleMutation(createTodo, create),
      onError: (_error, _newTodo, context) => {
        queryClient.setQueryData('todos', context?.previousTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const { mutate: updateTodos } = useMutation(
    (updateTodos: UpdateTodo) => todoController.updateTodos(updateTodos),
    {
      onMutate: (updateTodos) => handleMutation(updateTodos, update),
      onError: (_error, _newTodo, context) => {
        queryClient.setQueryData('todos', context?.previousTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const { mutate: removeTodo } = useMutation(
    (removeTodo: RemoveTodo) => todoController.removeTodo(removeTodo),
    {
      onMutate: (removeTodo) => handleMutation(removeTodo, remove),
      onError: (_error, _newTodo, context) => {
        queryClient.setQueryData('todos', context?.previousTodos);
      },
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const sortByUpdatedAt = (todos: TodoResponse[]) =>
    todos.sort(
      (a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt))
    );

  useEffect(() => {
    if (data) setSortedTodos(() => sortByUpdatedAt(data));
  }, [data]);

  return {
    isError,
    isLoading,
    sortedTodos,
    createTodo,
    updateTodos,
    removeTodo,
  };
};
export default useTodo;
