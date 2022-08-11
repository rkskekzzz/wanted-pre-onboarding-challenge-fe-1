import axios from 'axios';
import { TodoResponse } from 'src/types/TodoResponse';
import throwError from 'src/errors/throwError';
import makeApiPath from './api';

const todoController = {
  getTodos: async (): Promise<TodoResponse[] | null> => {
    const method = 'GET';
    const url = makeApiPath('/todos');
    const token = window.localStorage.getItem('todoAuthToken');

    return axios({
      method,
      headers: {
        Authorization: token,
      },
      url,
    })
      .then((response) => response.data.data)
      .catch(throwError);
  },
  getTodosById: async (id: string): Promise<TodoResponse | null> => {
    const method = 'GET';
    const url = makeApiPath(`/todos/${id}`);
    const token = window.localStorage.getItem('todoAuthToken');

    return axios({
      method,
      headers: {
        Authorization: token,
      },
      url,
    })
      .then((response) => response.data.data)
      .catch(throwError);
  },
  createTodo: async (
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    const method = 'POST';
    const url = makeApiPath('/todos');
    const token = window.localStorage.getItem('todoAuthToken');
    const body = { title, content };

    return axios({
      method,
      headers: {
        Authorization: token,
      },
      data: body,
      url,
    })
      .then((response) => response.data.data)
      .catch(throwError);
  },
  updateTodo: async (
    id: string,
    title: string,
    content: string
  ): Promise<TodoResponse | null> => {
    const method = 'PUT';
    const url = makeApiPath(`/todos/${id}`);
    const token = window.localStorage.getItem('todoAuthToken');
    const body = { title, content };

    return axios({
      method,
      headers: {
        Authorization: token,
      },
      data: body,
      url,
    })
      .then((response) => response.data.data)
      .catch(throwError);
  },
  deleteTodo: async (id: string): Promise<TodoResponse | null> => {
    const method = 'DELETE';
    const url = makeApiPath(`/todos/${id}`);
    const token = window.localStorage.getItem('todoAuthToken');

    return axios({
      method,
      headers: {
        Authorization: token,
      },
      url,
    })
      .then((response) => response.data.data)
      .catch(throwError);
  },
};

export default todoController;
