import React from 'react';

const todos = [
  {
    id: 1,
    text: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    text: 'Todo 2',
    completed: false,
  },
];

const Todo = () => {
  return (
    <div>
      {todos.map((todo) => (
        // 여기서 toto item
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
};

export default Todo;
