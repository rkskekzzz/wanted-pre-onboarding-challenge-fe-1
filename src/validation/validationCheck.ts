type Validation = 'EmailError' | 'PasswordError' | 'Success';

function emailValidationCheck(email: string) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.toLowerCase());
}

function passwordValidationCheck(password: string) {
  return password.length >= 8;
}

export function validationCheck(email: string, password: string): Validation {
  if (!emailValidationCheck(email)) return 'EmailError';
  if (!passwordValidationCheck(password)) return 'PasswordError';
  return 'Success';
}
