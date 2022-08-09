import { useEffect, useState } from 'react';
import { authService } from 'src/api/authController';
import { AuthResponse } from 'src/types/AuthResponse';

export function useSign() {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [signStateMessage, setSignStateMessage] = useState<string>('');

  const handleSignIn = ({ message, token }: AuthResponse) => {
    window.localStorage.setItem('todoAuthToken', token);
    setSignStateMessage(message);
    setIsSignedIn(true);
  };

  const handleAuthError = (error: Error) => {
    alert(error.message);
  };

  const login = (email: string, password: string) => {
    authService
      .login(email, password)
      .then(handleSignIn)
      .catch(handleAuthError);
  };

  const signUp = (email: string, password: string) => {
    authService
      .signUp(email, password)
      .then(handleSignIn)
      .catch(handleAuthError);
  };

  useEffect(() => {
    if (window.localStorage.getItem('todoAuthToken')) setIsSignedIn(true);
  }, []);

  return {
    isSignedIn,
    signStateMessage,
    login,
    signUp,
  };
}
