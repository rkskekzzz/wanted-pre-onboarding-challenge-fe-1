import React from 'react';
import { useNavigate } from 'react-router-dom';
import useTodo from 'src/hooks/useTodo';
import { Container, Header } from 'src/components';
import { Divider, CircularProgress } from '@mui/material';
import { TodoItem, TodoAddBox } from './components';

const Todo = () => {
  const navigate = useNavigate();
  const { sortedTodos, isError, isLoading, createTodo, updateTodos, removeTodo } = useTodo();

  React.useEffect(() => {
    if (isError) {
      window.localStorage.removeItem('todoAuthToken');
      navigate('/auth');
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <>
      <Header />
      <Container>
        <TodoAddBox createTodo={createTodo} />
        <Divider />
        <TodoItem todos={sortedTodos} updateTodos={updateTodos} removeTodo={removeTodo} />
      </Container>
    </>
  );
};

export default Todo;
