import { TodoResponse } from 'src/types/TodoResponse';
import todoControllerAxiosInstance from './todoControllerAxiosInstance';

const todoController = {
  getTodos: async (): Promise<TodoResponse[] | null> => {
    return todoControllerAxiosInstance({
      method: 'GET',
      url: '/todos',
    }).then((response) => response.data);
  },
  getTodosById: async (id: string): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance({
      method: 'GET',
      url: `/todos/${id}`,
    }).then((response) => response.data);
  },
  createTodo: async (
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance({
      method: 'POST',
      data: { title, content },
      url: '/todos',
    }).then((response) => response.data);
  },
  updateTodo: async (
    id: string,
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance({
      method: 'PUT',
      data: { title, content },
      url: `/todos/${id}`,
    }).then((response) => response.data);
  },
  deleteTodo: async (id: string): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance({
      method: 'DELETE',
      url: `/todos/${id}`,
    }).then((response) => response.data);
  },
};

export default todoController;
