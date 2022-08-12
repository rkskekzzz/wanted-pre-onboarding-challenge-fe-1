import React, { useState, useEffect } from 'react';
import { validationCheckWithEmailPassword } from 'src/validation/validationCheck';
import { SignInForm } from 'src/style/SignInForm.styled';
import { TextField, Button } from '@mui/material';

interface SignFormProps {
  submitAction: (email: string, password: string) => Promise<void>;
  submitButtonText: string;
}

const SignForm = ({ submitAction, submitButtonText }: SignFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsButtonDisabled(true);
    switch (validationCheckWithEmailPassword(email, password)) {
      case 'Success':
        await submitAction(email, password);
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
    setIsButtonDisabled(false);
  };

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setIsButtonDisabled(false);
    }
  }, [email, password]);

  return (
    <SignInForm onSubmit={handleSubmit}>
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
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={isButtonDisabled}
      >
        {submitButtonText}
      </Button>
    </SignInForm>
  );
};

export default SignForm;
