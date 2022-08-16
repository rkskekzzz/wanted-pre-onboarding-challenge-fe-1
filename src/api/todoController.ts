import { TodoResponse, CreateTodo, UpdateTodo, RemoveTodo } from 'src/types/Todo';
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
  createTodo: async ({ title, content }: CreateTodo): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'POST',
      data: { title, content },
      url: '/todos',
    });
  },
  updateTodos: async ({ id, title, content }: UpdateTodo): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'PUT',
      data: { title, content },
      url: `/todos/${id}`,
    });
  },
  removeTodo: async ({ id }: RemoveTodo): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'DELETE',
      url: `/todos/${id}`,
    });
  },
};

export default todoController;
