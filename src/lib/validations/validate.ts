import { type AnySchema, ValidationError } from 'yup';

import type { RecursiveErrorSchema } from './types';

const parseErrorSchema = <T, U = RecursiveErrorSchema<T>>(
  values: T,
  error: ValidationError,
  parentKey?: string
): U => {
  return Object.entries(values).reduce((parsedErrorSchema, [key, value]) => {
    if (Array.isArray(value)) {
      return Object.assign(parsedErrorSchema, {
        [key]: value.map((i, idx) =>
          parseErrorSchema(i, error, `${key}[${idx}]`)
        )
      });
    }

    const path = parentKey ? `${parentKey}.${key}` : key;
    const errorForPath = (error.inner || []).find((i) => i.path === path);
    if (errorForPath) {
      const { type, message } = errorForPath;
      return Object.assign(parsedErrorSchema, { [key]: { type, message } });
    }

    return parsedErrorSchema;
  }, {} as U);
};

export default async <T, U = RecursiveErrorSchema<T>>(
  values: T,
  schema: AnySchema
): Promise<[T | null, U | null]> => {
  try {
    await schema.validate(values, { abortEarly: false });
    return [values, null];
  } catch (error: unknown) {
    if (error instanceof ValidationError) {
      return [null, parseErrorSchema(values, error)];
    }

    throw error;
  }
};
