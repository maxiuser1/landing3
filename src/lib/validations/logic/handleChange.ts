import { isBlurEvent, isFieldElement } from '$lib/utils/dom';
import get from '$lib/utils/get';
import isDeepEqual from '$lib/utils/isDeepEqual';
import isEmpty from '$lib/utils/isEmpty';
import isEmptyObject from '$lib/utils/isEmptyObject';
import set from '$lib/utils/set';
import { get as getFromStore, type Writable } from 'svelte/store';
import type { FieldValues, FormState } from '../types';
import getFieldValue from '../utils/getFieldValue';
import executeResolver from './executeResolver';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	async (event: Event) => {
		const ref = event.target;

		if (!isFieldElement(ref)) {
			return;
		}

		const {
			fields,
			options: { resolver }
		} = getFromStore(store);

		const field = get(fields, ref.name);

		if (!field) {
			return;
		}

		const value = getFieldValue(field._f);

		store.update((current) => ({
			...current,
			values: set(current.values, ref.name, value)
		}));

		if (isBlurEvent(event)) {
			store.update((current) => ({
				...current,
				touchedFields: set(current.touchedFields, ref.name, true)
			}));
		}

		store.update((current) => {
			if (get(current.dirtyFields, ref.name)) {
				return current;
			}

			const defaultValue = get(current.defaultValues, ref.name);
			const value = get(current.values, ref.name);

			const isDirty =
				isEmpty(defaultValue) && isEmpty(value) ? false : !isDeepEqual(defaultValue, value);

			return {
				...current,
				dirtyFields: set(current.dirtyFields, ref.name, isDirty)
			};
		});

		const { errors } = await executeResolver(store)(resolver);

		store.update((current) => ({
			...current,
			isValid: isEmptyObject(errors),
			errors: errors as any
		}));
	};
