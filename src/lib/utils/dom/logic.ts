import type { FieldElement } from '$lib/validations/types';
import isUndefined from '../isUndefined';
import { isFieldElement, isHTMLElement, isHTMLFieldSetElement } from './guards';

export const getRadioValue = (options?: HTMLInputElement[]) =>
	options?.find((option) => !option.disabled && option.checked)?.value || null;

export const getCheckboxValue = (options?: HTMLInputElement[]) => {
	if (!options) {
		return false;
	}

	if (options.length > 1) {
		return options
			.filter((option) => !option.disabled && option.checked)
			.map((option) => option.value);
	}

	const [firstOption] = options;

	if (!firstOption) {
		return false;
	}

	return firstOption.checked && !firstOption.disabled
		? firstOption.hasAttribute('value')
			? isUndefined(firstOption.value) || firstOption.value === ''
				? true
				: firstOption.value
			: true
		: false;
};

export const getFieldElements = (element: unknown): FieldElement[] => {
	if (!isHTMLElement(element)) {
		return [];
	}

	if (isFieldElement(element)) {
		return [element];
	}

	if (element.childElementCount === 0) {
		return [];
	}

	const fieldElements: Set<FieldElement> = new Set();

	for (const child of Array.from(element.children)) {
		if (isFieldElement(child)) {
			fieldElements.add(child);
		}

		if (isHTMLFieldSetElement(child)) {
			for (const fieldsetChild of Array.from(child.elements)) {
				if (isFieldElement(fieldsetChild)) {
					fieldElements.add(fieldsetChild);
				}
			}
		}

		if (child.childElementCount > 0) {
			getFieldElements(child).forEach((value) => fieldElements.add(value));
		}
	}

	return Array.from(fieldElements);
};
