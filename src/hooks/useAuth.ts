import { useEffect, useState } from 'react';
import authController from 'src/api/authController';
// import { AuthResponse } from 'src/types/AuthResponse';

const useAuth = () => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleAuthError = (error: Error) => {
    alert(error.message);
  };

  const login = async (email: string, password: string) => {
    authController.login(email, password).then(handleSignIn).catch(handleAuthError);
  };

  const signUp = async (email: string, password: string) => {
    authController.signUp(email, password).then(handleSignIn).catch(handleAuthError);
  };

  useEffect(() => {
    if (window.localStorage.getItem('todoAuthToken')) setIsSignedIn(true);
  }, []);

  return {
    isSignedIn,
    login,
    signUp,
  };
};

export default useAuth;
