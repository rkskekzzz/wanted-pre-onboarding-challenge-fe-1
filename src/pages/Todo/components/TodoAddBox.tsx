import React, { useState } from 'react';
import { Button } from '@mui/material';
import TodoForm from 'src/style/TodoForm.styled';
import { TodoResponse } from 'src/types/TodoResponse';
import AddIcon from '@mui/icons-material/Add';

interface TodoAddBoxProps {
  createTodo: (todoItem: Pick<TodoResponse, 'todo'>) => void;
}

const TodoAddBox = ({ createTodo }: TodoAddBoxProps) => {
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTodo({ todo: newTodoTitle });
    setNewTodoTitle('');
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
