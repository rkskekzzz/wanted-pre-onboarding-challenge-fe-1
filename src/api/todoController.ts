import { TodoResponse } from 'src/types/TodoResponse';
import todoControllerAxiosInstance from './todoControllerAxiosInstance';

const todoController = {
  getTodos: (): Promise<TodoResponse[] | null> => {
    return todoControllerAxiosInstance<TodoResponse[]>({
      method: 'GET',
      url: '/todos',
    });
  },
  getTodosById: (todoItem: Pick<TodoResponse, 'id'>): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'GET',
      url: `/todos/${todoItem.id}`,
    });
  },
  createTodo: (todoItem: Pick<TodoResponse, 'todo'>): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'POST',
      data: todoItem,
      url: '/todos',
    });
  },
  updateTodo: (todoItem: Pick<TodoResponse, 'id' | 'todo' | 'isCompleted'>): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'PUT',
      data: { todo: todoItem.todo, isCompleted: todoItem.isCompleted },
      url: `/todos/${todoItem.id}`,
    });
  },
  deleteTodo: (todoItem: Pick<TodoResponse, 'id'>): Promise<TodoResponse | null> => {
    return todoControllerAxiosInstance<TodoResponse>({
      method: 'DELETE',
      url: `/todos/${todoItem.id}`,
    });
  },
};

export default todoController;
