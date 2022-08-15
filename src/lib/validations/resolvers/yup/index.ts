import type { FieldError } from '$lib/validations/types';
import { ValidationError } from 'yup';
import toNestError from '../toNestError';
import type { Resolver } from './types';

const parseErrorSchema = (error: ValidationError) =>
	(error.inner || []).reduce<Record<string, FieldError>>((previous, error) => {
		if (!error.path) {
			return previous;
		}

		if (!previous[error.path] && error.type) {
			previous[error.path] = { message: error.message, type: error.type };
		}

		return previous;
	}, {});

export const resolver: Resolver =
	(schema, schemaOptions = {}) =>
	async (values) => {
		try {
			const result = await schema.validate(
				values,
				Object.assign({ abortEarly: false }, schemaOptions)
			);
			return {
				values: result,
				errors: {}
			};
		} catch (error: unknown) {
			if (error instanceof ValidationError) {
				return {
					values: {},
					errors: toNestError<typeof values>(parseErrorSchema(error))
				};
			}

			throw error;
		}
	};

export default resolver;
