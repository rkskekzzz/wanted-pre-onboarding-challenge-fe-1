import { UseMutateFunction } from 'react-query';
import { ObjectWithId } from './ObjectWithId';

export interface TodoResponse extends ObjectWithId {
  title?: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateTodo = Pick<TodoResponse, 'title' | 'content'>;
export type UpdateTodo = Pick<TodoResponse, 'id' | 'title' | 'content'>;
export type RemoveTodo = Pick<TodoResponse, 'id'>;
export type MutateTodo = CreateTodo | UpdateTodo | RemoveTodo;

export type CreateMutateFunction = UseMutateFunction<
  TodoResponse,
  unknown,
  CreateTodo,
  {
    previousTodos: TodoResponse[];
  }
>;

export type UpdateMutateFunction = UseMutateFunction<
  TodoResponse,
  unknown,
  UpdateTodo,
  {
    previousTodos: TodoResponse[];
  }
>;

export type RemoveMutateFunction = UseMutateFunction<
  TodoResponse,
  unknown,
  RemoveTodo,
  {
    previousTodos: TodoResponse[];
  }
>;
