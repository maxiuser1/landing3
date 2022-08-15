import type { FieldsAsError } from './errors';
import type { FieldValues } from './fields';

export type ResolverSuccess<TFieldValues extends FieldValues = FieldValues> = {
  values: TFieldValues;
  errors: Record<string, never>;
};

export type ResolverError<TFieldValues extends FieldValues = FieldValues> = {
  values: Record<string, never>;
  errors: FieldsAsError<TFieldValues>;
};

export type ResolverResult<TFieldValues extends FieldValues = FieldValues> =
  | ResolverSuccess<TFieldValues>
  | ResolverError<TFieldValues>;

export type Resolver<TFieldValues extends FieldValues = FieldValues> = (
  values: TFieldValues
) => Promise<ResolverResult<TFieldValues>> | ResolverResult<TFieldValues>;
