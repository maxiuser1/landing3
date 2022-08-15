import { isCheckbox, isFileInput, isMultipleSelect } from '$lib/utils/dom';
import get from '$lib/utils/get';
import type { Field, FieldValues, FormState } from '../types';
import { type Writable, get as getFromStore } from 'svelte/store';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	async (name: string, value: unknown) => {
		const { fields } = getFromStore(store);
		const field = get(fields, name) as Field;

		if (!field || !field._f) {
			return;
		}

		const { _f } = field;

		if (isMultipleSelect(_f.ref)) {
			for (const option of Array.from(_f.ref.options)) {
				option.selected = Array.isArray(value) ? value.includes(option.value) : false;
			}
		} else if (_f.refs) {
			if (isCheckbox(_f.ref)) {
				if (_f.refs.length > 1) {
					for (const checkbox of _f.refs) {
						checkbox.checked = Array.isArray(value)
							? value.some((valueItem) => valueItem === checkbox.value)
							: value === checkbox.value;
					}
				} else {
					const [checkbox] = _f.refs;

					if (checkbox) {
						checkbox.checked = !!value;
					}
				}
			} else {
				for (const radio of _f.refs) {
					radio.checked = radio.value === value;
				}
			}
		} else {
			_f.ref.value = isFileInput(_f.ref) ? '' : typeof value === 'string' ? value : '';
		}
	};
