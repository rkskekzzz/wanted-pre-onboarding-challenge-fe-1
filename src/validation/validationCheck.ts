type Validation = 'EmailError' | 'PasswordError' | 'Success';

function emailValidationCheck(email: string) {
  const emailRegex = /[\w\-.]+@[\w\-.]+/gi;
  return emailRegex.test(email.toLowerCase());
}

function passwordValidationCheck(password: string) {
  return password.length >= 8;
}

export const validationCheckWithEmailPassword = (email: string, password: string): Validation => {
  if (!emailValidationCheck(email)) return 'EmailError';
  if (!passwordValidationCheck(password)) return 'PasswordError';
  return 'Success';
};
