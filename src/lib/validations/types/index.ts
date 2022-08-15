export * from './fields';
export * from './form';
export * from './resolvers';
export * from './errors';

type ErrorType = { type: string; message: string };

type RecursiveErrorSchemaItem<T> = T extends Array<unknown>
  ? { [index: number]: RecursiveErrorSchema<T[0]> }
  : ErrorType;

export type RecursiveErrorSchema<T> = {
  [key in keyof T]: RecursiveErrorSchemaItem<T[key]>;
};
