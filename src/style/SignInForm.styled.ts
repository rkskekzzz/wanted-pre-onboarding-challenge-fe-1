import styled from '@emotion/styled';

const SignInForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 15%;
`;

const SignInBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  h1 {
    text-align: center;
  }
`;

export { SignInForm, SignInBox };
