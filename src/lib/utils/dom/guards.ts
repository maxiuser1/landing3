import type { FieldElement } from '$lib/validations/types';

export const isCheckbox = (element: FieldElement): element is HTMLInputElement =>
	element.type === 'checkbox';

export const isRadio = (element: FieldElement): element is HTMLInputElement =>
	element.type === 'radio';

export const isRadioOrCheckbox = (element: FieldElement): element is HTMLInputElement =>
	isRadio(element) || isCheckbox(element);

export const isFileInput = (element: FieldElement): element is HTMLInputElement =>
	element.type === 'file';

export const isHTMLElement = (element: unknown): element is HTMLElement =>
	element instanceof HTMLElement;

export const isHTMLFieldSetElement = (element: unknown): element is HTMLFieldSetElement =>
	element instanceof HTMLFieldSetElement;

export const isHTMLFormElement = (element: unknown): element is HTMLFormElement =>
	element instanceof HTMLFormElement;

export const isHTMLInputElement = (element: unknown): element is HTMLInputElement =>
	element instanceof HTMLInputElement;

export const isHTMLSelectElement = (element: unknown): element is HTMLSelectElement =>
	element instanceof HTMLSelectElement;

export const isHTMLTextAreaElement = (element: unknown): element is HTMLTextAreaElement =>
	element instanceof HTMLTextAreaElement;

export const isMultipleSelect = (element: FieldElement): element is HTMLSelectElement =>
	element.type === 'select-multiple';

export const isFieldElement = (element: unknown): element is FieldElement =>
	isHTMLInputElement(element) || isHTMLSelectElement(element) || isHTMLTextAreaElement(element);

export const isBlurEvent = (event: unknown): event is FocusEvent =>
	event instanceof FocusEvent && (event.type === 'blur' || event.type === 'focusout');
