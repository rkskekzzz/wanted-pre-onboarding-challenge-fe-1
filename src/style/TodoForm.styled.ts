import styled from '@emotion/styled';

const TodoForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 15px;

  .contents {
    width: 100%;

    input {
      padding: 0;
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
    width: 80px;
    flex-direction: column;
  }
`;

export default TodoForm;
