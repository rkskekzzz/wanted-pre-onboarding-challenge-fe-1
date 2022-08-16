import { ObjectWithId } from 'src/types/ObjectWithId';

export interface OptimisticFunction {
  <T extends ObjectWithId>(prev: T[], cur: T): T[];
}

export const create: OptimisticFunction = (prev, cur) => {
  return [...prev, cur];
};

export const update: OptimisticFunction = (prev, cur) => {
  return prev.map((todo) => (todo.id === cur.id ? cur : todo));
};

export const remove: OptimisticFunction = (prev, cur) => {
  return prev.filter((todo) => todo.id !== cur.id);
};
