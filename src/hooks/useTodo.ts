import { useEffect, useState } from 'react';
import todoController from 'src/api/todoController';
import { createDummyTodo } from 'src/utils/todoDummy';
import { TodoResponse, CreateTodo, UpdateTodo, MutateTodo, RemoveTodo } from 'src/types/Todo';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { OptimisticFunction, create, update, remove } from 'src/utils/OptimisticFunction';

const useTodo = () => {
  const queryClient = useQueryClient();
  const [sortedTodos, setSortedTodos] = useState<TodoResponse[]>([]);
  const { data, isError, isLoading } = useQuery('todos', todoController.getTodos);

  const handleRefetching = () => queryClient.invalidateQueries('todos');
  const handleMutation = async (mutateTodo: MutateTodo, optimisticFunction: OptimisticFunction) => {
    await queryClient.cancelQueries('todos');

    const dummyTodo = createDummyTodo(mutateTodo);
    const previousTodos = queryClient.getQueryData<TodoResponse[]>('todos');
    queryClient.setQueryData<TodoResponse[]>('todos', (_previousTodos) =>
      optimisticFunction(_previousTodos, dummyTodo)
    );
    return { previousTodos };
  };

  const { mutate: createTodo } = useMutation((createTodo: CreateTodo) => todoController.createTodo(createTodo), {
    onMutate: (createTodo) => handleMutation(createTodo, create),
    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData('todos', context?.previousTodos);
    },
    onSettled: handleRefetching,
  });

  const { mutate: updateTodos } = useMutation((updateTodos: UpdateTodo) => todoController.updateTodos(updateTodos), {
    onMutate: (updateTodos) => handleMutation(updateTodos, update),
    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData('todos', context?.previousTodos);
    },
    onSettled: handleRefetching,
  });

  const { mutate: removeTodo } = useMutation((removeTodo: RemoveTodo) => todoController.removeTodo(removeTodo), {
    onMutate: (removeTodo) => handleMutation(removeTodo, remove),
    onError: (_error, _newTodo, context) => {
      queryClient.setQueryData('todos', context?.previousTodos);
    },
    onSettled: handleRefetching,
  });

  const sortByUpdatedAt = (todos: TodoResponse[]) =>
    todos.sort((a, b) => Number(new Date(b.updatedAt)) - Number(new Date(a.updatedAt)));

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
