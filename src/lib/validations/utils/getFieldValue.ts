import {
	getCheckboxValue,
	getRadioValue,
	isCheckbox,
	isFileInput,
	isMultipleSelect,
	isRadio
} from '$lib/utils/dom';
import type { Field } from '$lib/validations/types';

export default (_f: Field['_f']) => {
	const ref = _f.ref;

	if (_f.refs ? _f.refs.every((ref) => ref.disabled) : ref.disabled) {
		return;
	}

	if (isFileInput(ref)) {
		return ref.files;
	}

	if (isRadio(ref)) {
		return getRadioValue(_f.refs);
	}

	if (isMultipleSelect(ref)) {
		return Array.from(ref.selectedOptions).map(({ value }) => value);
	}

	if (isCheckbox(ref)) {
		return getCheckboxValue(_f.refs);
	}

	return ref.value;
};
