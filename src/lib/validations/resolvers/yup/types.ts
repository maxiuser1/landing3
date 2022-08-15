import type { FieldValues, ResolverResult } from '$lib/validations/types';
import type { AnyObjectSchema } from 'yup';

type Options<T extends AnyObjectSchema> = Parameters<T['validate']>[1];

export type Resolver = <T extends AnyObjectSchema>(
	schema: T,
	schemaOptions?: Options<T>
) => <TFieldValues extends FieldValues>(
	values: TFieldValues
) => Promise<ResolverResult<TFieldValues>>;
