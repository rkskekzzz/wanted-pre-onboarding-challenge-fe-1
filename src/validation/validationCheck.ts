type Validation = 'EmailError' | 'PasswordError' | 'Success';

function emailValidationCheck(email: string) {
  const emailRegex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return emailRegex.test(email.toLowerCase());
}

function passwordValidationCheck(password: string) {
  return password.length >= 8;
}

export const validationCheckWithEmailPassword = (
  email: string,
  password: string
): Validation => {
  if (!emailValidationCheck(email)) return 'EmailError';
  if (!passwordValidationCheck(password)) return 'PasswordError';
  return 'Success';
};
