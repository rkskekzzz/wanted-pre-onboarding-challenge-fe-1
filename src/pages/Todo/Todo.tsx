import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTodo from 'src/hooks/useTodo';
import { Container, Header } from 'src/components';
import { Divider, CircularProgress } from '@mui/material';
import { TodoItem, TodoAddBox } from './components';

const Todo = () => {
  const navigate = useNavigate();
  const {
    todos,
    isLoading,
    isError,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (isError) {
      window.localStorage.removeItem('todoAuthToken');
      navigate('/auth');
    }
  }, [isError]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Header />
      <Container>
        <TodoAddBox createTodo={createTodo} />
        <Divider />
        <TodoItem
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      </Container>
    </>
  );
};

export default Todo;
