import set from '$lib/utils/set';
import type { FieldError, FieldsAsError, FieldValues } from '../types';

export default <TFieldValues extends FieldValues>(
	errors: Record<string, FieldError>
): FieldsAsError<TFieldValues> => {
	const fieldErrors = {} as FieldsAsError<TFieldValues>;

	for (const path in errors) {
		set(fieldErrors, path, errors[path]);
	}

	return fieldErrors;
};
