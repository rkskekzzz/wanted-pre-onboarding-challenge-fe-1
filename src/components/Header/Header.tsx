import React from 'react';
import styled from '@emotion/styled';

const TodoHeader = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;

const Header = () => {
  return <TodoHeader>Todos</TodoHeader>;
};

export default Header;
