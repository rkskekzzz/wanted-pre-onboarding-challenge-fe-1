import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import useTodo from 'src/hooks/useTodo';
import { Container, Header } from 'src/components';
import { TodoItem, TodoAddBox } from './components';

const Todo = () => {
  // const navigate = useNavigate();
  const { todos, getTodos, createTodo, updateTodo, deleteTodo } = useTodo();

  useEffect(() => {
    getTodos();
  }, []);

  // useEffect(() => {
  //   if (isError) {
  //     window.localStorage.removeItem('todoAuthToken');
  //     alert('잘못된 토큰입니다. 다시 로그인해주세요.');
  //     navigate('/auth');
  //   }
  // }, [isError]);

  // if (isLoading) {
  //   return <div>로딩중...</div>;
  // }

  return (
    <>
      <Header />
      <Container>
        <TodoAddBox createTodo={createTodo} />
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
