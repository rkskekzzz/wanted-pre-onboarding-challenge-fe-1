import styled from '@emotion/styled';

const TodoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .contents {
    input {
      width: 100%;
      border: 0px;
    }
    #title {
      font-size: 2rem;
      font-weight: 600;
    }
    #content {
      font-size: 1.5rem;
      font-weight: 300;
    }
  }

  .buttons {
    flex-direction: column;
  }
`;

export default TodoForm;
