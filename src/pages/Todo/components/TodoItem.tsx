import React, { useState, useRef, useEffect } from 'react';
import { TodoResponse } from 'src/types/TodoResponse';
import TodoForm from 'src/style/TodoForm.styled';
import { Button } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';

interface InputRef {
  ref: HTMLInputElement | null;
}
type TodoResponseId = Pick<TodoResponse, 'id'>;
type TargetObject = TodoResponseId & InputRef;

const completeStyle = {
  textDecoration: 'line-through',
  color: 'gray',
};

const plainStyle = {
  textDecoration: 'none',
  color: 'black',
};
interface TodoItemProps {
  todos: TodoResponse[];
  updateTodo: (todoItem: Pick<TodoResponse, 'id' | 'todo' | 'isCompleted'>) => void;
  deleteTodo: (todoItem: Pick<TodoResponse, 'id'>) => void;
}

const TodoItem = ({ todos, updateTodo, deleteTodo }: TodoItemProps) => {
  const [isUpdateButtonTabbed, setIsUpdateButtonTabbed] = useState<TodoResponseId | null>(null);
  const [updateTodoText, setUpdateTodoText] = useState('');
  const targets = useRef<TargetObject[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, todoItem: TodoResponse) => {
    e.preventDefault();
    updateTodo({ id: todoItem.id, todo: updateTodoText, isCompleted: todoItem.isCompleted });
  };

  const handleUpdateButtonTabbed = ({ id, todo }: TodoResponse) => {
    setIsUpdateButtonTabbed({ id });
    setUpdateTodoText(todo);
  };

  const handleEditButtonClick = ({ id, isCompleted }: TodoResponse) => {
    updateTodo({ id, todo: updateTodoText, isCompleted });
    setIsUpdateButtonTabbed(null);
  };

  const handleUpdateCancelButtonClick = () => {
    setIsUpdateButtonTabbed(null);
  };

  const handleCheckboxChange = (checked: boolean, todoItem: TodoResponse) => {
    updateTodo({ id: todoItem.id, todo: todoItem.todo, isCompleted: checked });
  };

  const handleDeleteButtonClick = ({ id, todo }: TodoResponse) => {
    if (window.confirm(`${todo}를 삭제하시겠습니까?`)) deleteTodo({ id });
  };

  const sortTodosByIsCompleted = (unsortedTodos: TodoResponse[]) => {
    const completedTodos = unsortedTodos.filter((todo) => todo.isCompleted);
    const uncompletedTodos = unsortedTodos.filter((todo) => !todo.isCompleted);
    return [...uncompletedTodos, ...completedTodos];
  };

  useEffect(() => {
    if (!isUpdateButtonTabbed) return;
    const currentTarget = (predicate: (element: TargetObject) => boolean) => targets.current.find(predicate);
    const predicateTodo = (element: TargetObject) => element.id === isUpdateButtonTabbed.id;
    const currentTargetToFocus = currentTarget(predicateTodo);

    if (targets && targets.current.length > 0 && currentTargetToFocus) {
      currentTargetToFocus.ref.focus();
    }
  }, [isUpdateButtonTabbed]);

  return (
    <>
      {sortTodosByIsCompleted(todos).map((todoItem) => (
        <TodoForm key={todoItem.id} onSubmit={(e) => handleSubmit(e, todoItem)}>
          <Checkbox
            inputProps={{ 'aria-label': 'Todo Checkbox' }}
            checked={todoItem.isCompleted}
            onChange={(_, checked) => handleCheckboxChange(checked, todoItem)}
          />
          <div className="contents">
            {isUpdateButtonTabbed && isUpdateButtonTabbed.id === todoItem.id ? (
              <input
                ref={(ref) => targets.current.push({ id: todoItem.id, ref })}
                id="title"
                type="text"
                placeholder="title"
                value={updateTodoText}
                onChange={(e) => setUpdateTodoText(e.target.value)}
              />
            ) : (
              <div id="title" style={todoItem.isCompleted ? completeStyle : plainStyle}>
                {todoItem.todo}
              </div>
            )}
          </div>
          <div className="buttons">
            {isUpdateButtonTabbed && isUpdateButtonTabbed.id === todoItem.id ? (
              <Button type="button" onClick={() => handleEditButtonClick(todoItem)} aria-label="submit button">
                <CheckCircleOutlineIcon />
              </Button>
            ) : (
              <Button type="submit" aria-label="submit button" onClick={() => handleUpdateButtonTabbed(todoItem)}>
                <EditIcon />
              </Button>
            )}
            {isUpdateButtonTabbed && isUpdateButtonTabbed.id === todoItem.id ? (
              <Button type="button" onClick={handleUpdateCancelButtonClick} aria-label="submit button">
                <HighlightOffIcon />
              </Button>
            ) : (
              <Button type="button" onClick={() => handleDeleteButtonClick(todoItem)} aria-label="submit button">
                <DeleteOutlineIcon />
              </Button>
            )}
          </div>
        </TodoForm>
      ))}
    </>
  );
};

export default TodoItem;
