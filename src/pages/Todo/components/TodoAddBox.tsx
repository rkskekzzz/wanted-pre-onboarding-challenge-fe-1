import React, { useState } from 'react';
import { Button } from '@mui/material';
import TodoForm from 'src/style/TodoForm.styled';
import { CreateMutateFunction } from 'src/types/Todo';
import AddIcon from '@mui/icons-material/Add';

interface TodoAddBoxProps {
  createTodo: CreateMutateFunction;
}

const TodoAddBox = ({ createTodo }: TodoAddBoxProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoContent, setNewTodoContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({ title: newTodoTitle, content: newTodoContent });
    setNewTodoTitle('');
    setNewTodoContent('');
  };

  return (
    <TodoForm onSubmit={handleSubmit}>
      <div className="contents">
        <input
          id="title"
          type="text"
          placeholder="title"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          id="content"
          type="text"
          placeholder="content"
          value={newTodoContent}
          onChange={(e) => setNewTodoContent(e.target.value)}
        />
      </div>
      <div className="buttons">
        <Button variant="contained" type="submit">
          <AddIcon />
        </Button>
      </div>
    </TodoForm>
  );
};

export default TodoAddBox;
