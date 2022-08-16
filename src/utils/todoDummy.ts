import { TodoResponse } from 'src/types/Todo';

export const createDummyTodo = (data: Partial<TodoResponse>): TodoResponse => {
  return {
    id: data.id?.toString() ?? Math.random().toString(),
    title: data.title ?? 'title',
    content: data.content ?? 'content',
    createdAt: data.createdAt ?? Date.now().toString(),
    updatedAt: data.updatedAt ?? Date.now().toString(),
  };
};

export const createDummyTodos = (numbers: number): TodoResponse[] => {
  return Array.from(Array(numbers), () => createDummyTodo({}));
};

export const dummyTodo = createDummyTodo({});
