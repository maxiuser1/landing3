import cloneDeep from '$lib/utils/cloneDeep';
import get from '$lib/utils/get';
import isEmptyObject from '$lib/utils/isEmptyObject';
import isNullOrUndefined from '$lib/utils/isNullOrUndefined';
import isObject from '$lib/utils/isObject';
import set from '$lib/utils/set';
import { get as getFromStore, type Writable } from 'svelte/store';
import {
	isField,
	type FieldPath,
	type FieldPathValue,
	type FieldsAsError,
	type FieldValues,
	type FormState,
	type InternalFieldName,
	type SetFieldValue,
	type SetValueConfig
} from '../types';
import executeResolver from './executeResolver';
import setFieldValue from './setFieldValue';

const setValues =
	<TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	(name: InternalFieldName, value: SetFieldValue<TFieldValues>) => {
		const { fields } = getFromStore(store);

		for (const key in value) {
			const path = `${name}.${key}`;
			const valueForKey = value[key];
			const maybeAfield = get(fields, path);

			if (isNullOrUndefined(maybeAfield)) {
				continue;
			}

			if (isField(maybeAfield)) {
				setFieldValue(store)(path, valueForKey);
			} else {
				if (isObject(valueForKey)) {
					setValues(store)(path, valueForKey);
				}
			}
		}
	};

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	async <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
		name: TFieldName,
		value: FieldPathValue<TFieldValues, TFieldName>,
		options: SetValueConfig = {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true
		}
	) => {
		const clonedValue = cloneDeep(value);

		store.update((current) => ({
			...current,
			values: set(current.values, name, clonedValue)
		}));

		const { fields } = getFromStore(store);
		console.log('name 1', name);
		const maybeAfield = get(fields, name);

		if (Array.isArray(maybeAfield)) {
			return;
		}

		if (isField(maybeAfield)) {
			setFieldValue(store)(name, clonedValue);
		} else {
			setValues(store)(name, clonedValue);
		}

		if (options.shouldDirty) {
			store.update((current) => ({
				...current,
				dirtyFields: set(current.dirtyFields, name, true)
			}));
		}

		if (options.shouldTouch) {
			store.update((current) => ({
				...current,
				touchedFields: set(current.touchedFields, name, true)
			}));
		}

		if (options.shouldValidate) {
			const {
				options: { resolver }
			} = getFromStore(store);

			// TODO: same logic as in handleChange, extract it somewhere and share
			const { errors } = await executeResolver(store)(resolver);

			store.update((current) => ({
				...current,
				isValid: isEmptyObject(errors),
				errors: errors as FieldsAsError<TFieldValues>
			}));
		}
	};
