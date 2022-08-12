import React, { useState, useCallback } from 'react';
import { TodoResponse } from 'src/types/TodoResponse';
import TodoForm from 'src/style/TodoForm.styled';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TodoItemProps {
  todos: TodoResponse[];
  updateTodo: (id: string, title: string, content: string) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem = ({ todos, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isUpdateButtonTabbed, setIsUpdateButtonTabbed] = useState<string>('');
  const [updateTodoTitle, setUpdateTodoTitle] = useState<string>('');
  const [updateTodoContent, setUpdateTodoContent] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    updateTodo(id, updateTodoTitle, updateTodoContent);
  };

  const handleUpdateButtonTabbed = ({ id, title, content }: TodoResponse) => {
    setIsUpdateButtonTabbed(id);
    setUpdateTodoTitle(title);
    setUpdateTodoContent(content);
  };

  const handleEditButtonClick = ({ id }: TodoResponse) => {
    updateTodo(id, updateTodoTitle, updateTodoContent);
    setIsUpdateButtonTabbed('');
  };

  const handleDeleteButtonClick = ({ id }: TodoResponse) => {
    deleteTodo(id);
  };

  return (
    <>
      {todos.map((todo) => (
        <TodoForm key={todo.id} onSubmit={(e) => handleSubmit(e, todo.id)}>
          <div className="contents">
            {isUpdateButtonTabbed === todo.id ? (
              <>
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
              </>
            ) : (
              <>
                <div id="title">{todo.title}</div>
                <div id="content">{todo.content}</div>
              </>
            )}
          </div>
          <div className="buttons">
            {isUpdateButtonTabbed === todo.id ? (
              <Button
                type="button"
                onClick={() => handleEditButtonClick(todo)}
                aria-label="submit button"
              >
                <CheckCircleOutlineIcon />
              </Button>
            ) : (
              <Button
                type="submit"
                aria-label="submit button"
                onClick={() => handleUpdateButtonTabbed(todo)}
              >
                <EditIcon />
              </Button>
            )}
            <Button
              type="button"
              onClick={() => handleDeleteButtonClick(todo)}
              aria-label="submit button"
            >
              <DeleteOutlineIcon />
            </Button>
          </div>
        </TodoForm>
      ))}
    </>
  );
};

export default TodoItem;
