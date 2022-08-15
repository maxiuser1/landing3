import get from '$lib/utils/get';
import isEmptyObject from '$lib/utils/isEmptyObject';
import type {
	FieldsAsError,
	FieldValues,
	FormState,
	SubmitErrorHandler,
	SubmitHandler
} from '../types';
import focusFieldBy from '../utils/focusFieldBy';
import { get as getFromStore, type Writable } from 'svelte/store';
import executeResolver from './executeResolver';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	(onValid: SubmitHandler<TFieldValues>, onInvalid?: SubmitErrorHandler<TFieldValues>) =>
	async (event?: SubmitEvent) => {
		if (event) {
			event.preventDefault();
		}

		const {
			options: { shouldFocusError, resolver },
			fields
		} = getFromStore(store);

		store.update((current) => ({
			...current,
			isSubmitting: true
		}));

		let hasErrors = false;
		let hasPromiseErrors = false;

		try {
			const { values, errors } = await executeResolver(store)(resolver);

			store.update((current) => ({
				...current,
				errors: errors as FieldsAsError<TFieldValues>
			}));

			hasErrors = !isEmptyObject(errors);

			if (hasErrors) {
				if (onInvalid) {
					await onInvalid(errors as FieldsAsError<TFieldValues>, event);
				}

				if (shouldFocusError) {
					focusFieldBy(fields, (key) => get(errors, key));
				}
			} else {
				await onValid(values as TFieldValues, event);
			}
		} catch (error: unknown) {
			hasPromiseErrors = true;
			throw error;
		} finally {
			store.update((current) => ({
				...current,
				isSubmitted: true,
				isSubmitting: false,
				isSubmitSuccessful: !hasErrors && hasPromiseErrors,
				submitCount: current.submitCount + 1
			}));
		}
	};
