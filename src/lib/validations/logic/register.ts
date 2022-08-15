import { isFieldElement, isRadioOrCheckbox } from '$lib/utils/dom';
import get from '$lib/utils/get';
import set from '$lib/utils/set';
import type { FieldValues, FormState, Ref } from '../types';
import getFieldValue from '../utils/getFieldValue';
import { get as getFromStore, type Writable } from 'svelte/store';
import setFieldValue from './setFieldValue';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	(element: unknown) => {
		if (!isFieldElement(element) || !element.name) {
			return;
		}

		const field = get(getFromStore(store).fields, element.name);
		const isCheckable = isRadioOrCheckbox(element);
		const refs = field?._f.refs || [];

		const isRegistered = isCheckable
			? refs.find((option: Ref) => option === element)
			: element === field?._f.ref;

		if (isRegistered) {
			return;
		}

		store.update((current) => ({
			...current,
			fields: set(current.fields, element.name, {
				_f: {
					...((field && field._f) || { name: element.name }),
					...(isCheckable
						? {
								refs: [...refs, element],
								ref: { type: element.type, name: element.name }
						  }
						: { ref: element })
				}
			}),
			values: set(
				current.values,
				element.name,
				element.disabled
					? undefined
					: get(current.values, element.name, getFieldValue(get(current.fields, element.name)._f))
			)
		}));

		const { values, defaultValues } = getFromStore(store);

		setFieldValue(store)(
			element.name,
			get(values, element.name) || get(defaultValues, element.name)
		);
	};
