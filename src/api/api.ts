import axios from 'axios';

export function makeApiPath(path: string) {
  return `${process.env.REACT_APP_API_URL}${path}`;
}
