import React, { useState, useRef, useEffect } from 'react';
import { TodoResponse, UpdateMutateFunction, RemoveMutateFunction } from 'src/types/Todo';
import TodoForm from 'src/style/TodoForm.styled';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type TargetObject = TodoResponse & {
  ref: HTMLInputElement | null;
};
interface TodoItemProps {
  todos: TodoResponse[];
  updateTodos: UpdateMutateFunction;
  removeTodo: RemoveMutateFunction;
}

const TodoItem = ({ todos, updateTodos, removeTodo }: TodoItemProps) => {
  const [isUpdateButtonTabbed, setIsUpdateButtonTabbed] = useState<TodoResponse>({ id: '' });
  const [updateTodoTitle, setUpdateTodoTitle] = useState<string>('');
  const [updateTodoContent, setUpdateTodoContent] = useState<string>('');
  const targets = useRef<TargetObject[]>([]);

  const handleUpdateButtonTabbed = ({ id, title, content }: TodoResponse) => {
    setIsUpdateButtonTabbed({ id });
    setUpdateTodoTitle(title);
    setUpdateTodoContent(content);
  };

  const handleEditButtonClick = ({ id }: TodoResponse) => {
    updateTodos({ id, title: updateTodoTitle, content: updateTodoContent });
    setIsUpdateButtonTabbed({ id: '' });
  };

  const handleDeleteButtonClick = ({ id, title }: TodoResponse) => {
    if (window.confirm(`${title} Todo를 삭제하시겠습니까?`)) removeTodo({ id });
  };

  const currentTarget = (predicate: (element: TargetObject) => boolean) => targets.current.find(predicate);

  useEffect(() => {
    const predicateTodo = (element: TargetObject) => element.id === isUpdateButtonTabbed.id;
    const currentTargetToFocus = currentTarget(predicateTodo);

    if (targets && targets.current.length > 0 && currentTargetToFocus) {
      currentTargetToFocus.ref.focus();
    }
  }, [isUpdateButtonTabbed]);

  return (
    <>
      {todos.map((todo) => (
        <TodoForm key={todo.id}>
          <div className="contents">
            {isUpdateButtonTabbed.id === todo.id ? (
              <>
                <input
                  ref={(ref) => targets.current.push({ id: todo.id, ref })}
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
            {isUpdateButtonTabbed.id === todo.id ? (
              <Button type="button" onClick={() => handleEditButtonClick(todo)} aria-label="submit button">
                <CheckCircleOutlineIcon />
              </Button>
            ) : (
              <Button type="submit" aria-label="submit button" onClick={() => handleUpdateButtonTabbed(todo)}>
                <EditIcon />
              </Button>
            )}
            <Button type="button" onClick={() => handleDeleteButtonClick(todo)} aria-label="submit button">
              <DeleteOutlineIcon />
            </Button>
          </div>
        </TodoForm>
      ))}
    </>
  );
};

export default TodoItem;
