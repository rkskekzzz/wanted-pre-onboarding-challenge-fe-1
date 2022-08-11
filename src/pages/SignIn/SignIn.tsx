import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';
import validationCheck from 'src/validation/validationCheck';
import SignInForm from 'src/style/SignInForm.styled';
import { Container } from 'src/components';
import { TextField, Button } from '@mui/material';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { isSignedIn, login } = useAuth();

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    switch (validationCheck(email, password)) {
      case 'Success':
        login(email, password);
        break;
      case 'EmailError':
        alert('Please enter a valid email');
        break;
      case 'PasswordError':
        alert('Please enter a valid password');
        break;
      default:
        break;
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (isSignedIn) navigate('/');
  }, [isSignedIn]);

  return (
    <Container>
      <SignInForm onSubmit={handleSubmit}>
        <h1>Todos</h1>
        <TextField
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          id="outlined-basic"
          label="e-mail"
          variant="outlined"
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
          id="outlined-basic"
          label="password"
          variant="outlined"
          fullWidth
        />
        <Button fullWidth type="submit" variant="contained" disabled={disabled}>
          Sign In
        </Button>
      </SignInForm>
    </Container>
  );
};

export default SignIn;
