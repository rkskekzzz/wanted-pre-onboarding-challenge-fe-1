import { TodoResponse } from 'src/types/TodoResponse';
import todoControllerAxiosInstance from './todoControllerAxiosInstance';

const todoController = {
  getTodos: async (): Promise<TodoResponse[] | null> => {
    return todoControllerAxiosInstance({
      method: 'GET',
      url: '/todos',
    });
  },
  getTodosById: async (id: string): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'GET',
      url: `/todos/${id}`,
    });
  },
  createTodo: async (
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'POST',
      data: { title, content },
      url: '/todos',
    });
  },
  updateTodo: async (
    id: string,
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'PUT',
      data: { title, content },
      url: `/todos/${id}`,
    });
  },
  deleteTodo: async (id: string): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'DELETE',
      url: `/todos/${id}`,
    });
  },
};

export default todoController;
