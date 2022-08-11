import React, { useState } from 'react';
import { TodoResponse } from 'src/types/TodoResponse';
import TodoForm from 'src/style/TodoForm.styled';
import { Button } from '@mui/material';

interface TodoItemProps {
  todos: TodoResponse[];
  updateTodo: (id: string, title: string, content: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todos, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isUpdateButtonTabbed, setIsUpdateButtonTabbed] =
    useState<boolean>(true);
  const [updateTodoTitle, setUpdateTodoTitle] = useState<string>('');
  const [updateTodoContent, setUpdateTodoContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    updateTodo(id, updateTodoTitle, updateTodoContent);
  };

  const handleEditButtonClick = (id: string) => {
    updateTodo(id, 'hi', 'hi');
    setIsUpdateButtonTabbed(true);
  };

  const handleDeleteButtonClick = (id: string) => {
    deleteTodo(id);
  };

  return (
    <>
      {todos.map((todo) => (
        <TodoForm key={todo.id} onSubmit={(e) => handleSubmit(e, todo.id)}>
          <div className="contents">
            <input
              id="title"
              type="text"
              placeholder="title"
              value={updateTodoTitle}
              onChange={(e) => setUpdateTodoTitle(e.target.value)}
            />
            <input
              id="content"
              type="text"
              placeholder="content"
              value={updateTodoContent}
              onChange={(e) => setUpdateTodoContent(e.target.value)}
            />
          </div>
          <div className="buttons">
            {isUpdateButtonTabbed ? (
              <Button
                type="submit"
                aria-label="submit button"
                onClick={() => setIsUpdateButtonTabbed(false)}
              >
                수정
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => handleEditButtonClick(todo.id)}
                aria-label="submit button"
              >
                완료
              </Button>
            )}
            <Button
              type="button"
              onClick={() => handleDeleteButtonClick(todo.id)}
              aria-label="submit button"
            >
              삭제
            </Button>
          </div>
        </TodoForm>
      ))}
    </>
  );
};

export default TodoItem;
