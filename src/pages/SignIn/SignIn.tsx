import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSign } from 'src/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { validationCheck } from 'src/validation/validationCheck';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const { isSignedIn, login, signUp } = useSign();

  const handleEmailChange = ({ target: { value } }) => setEmail(value);
  const handlePasswordChange = ({ target: { value } }) => setPassword(value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisabled(true);
    switch (validationCheck(email, password)) {
      case 'EmailError':
        alert('Please enter a valid email');
        break;
      case 'PasswordError':
        alert('Please enter a valid password');
        break;
      case 'Success':
        login(email, password);
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" disabled={disabled}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
