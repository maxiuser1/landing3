import cloneDeep from '$lib/utils/cloneDeep';
import { getFieldElements, isHTMLElement, isHTMLFormElement } from '$lib/utils/dom';
import { derived, writable } from 'svelte/store';
import addField from './logic/addField';
import handleChange from './logic/handleChange';
import handleSubmit from './logic/handleSubmit';
import register from './logic/register';
import removeField from './logic/removeField';
import setValue from './logic/setValue';
import type {
	CreateForm,
	FieldElement,
	FieldsAsBoolean,
	FieldsAsError,
	FieldsAsRef,
	FieldValues,
	FormState
} from './types';

const defaultOptions = {
	shouldFocusError: true
} as const;

export default <TFieldValues extends FieldValues = FieldValues>(
	props: CreateForm<TFieldValues>
) => {
	const { defaultValues, ...otherProps } = props;

	const options = {
		...defaultOptions,
		...otherProps
	};

	const store = writable<FormState<TFieldValues>>({
		isDirty: false,
		isValid: false,
		isSubmitted: false,
		isSubmitting: false,
		isSubmitSuccessful: false,
		submitCount: 0,
		dirtyFields: {} as FieldsAsBoolean<TFieldValues>,
		touchedFields: {} as FieldsAsBoolean<TFieldValues>,
		errors: {} as FieldsAsError<TFieldValues>,
		fields: {} as FieldsAsRef<TFieldValues>,
		values: cloneDeep(defaultValues || {}) as TFieldValues,
		defaultValues: cloneDeep(defaultValues || {}) as TFieldValues,
		options
	});

	const form = (node: HTMLFormElement) => {
		if (!isHTMLFormElement(node)) {
			console.warn('not a form element', node);
			return;
		}

		Array.from(node.elements).forEach(register(store));

		const observer = new MutationObserver((mutationList) => {
			for (const mutation of mutationList) {
				if (mutation.type !== 'childList') {
					continue;
				}

				const addedElements = Array.from(mutation.addedNodes)
					.filter(isHTMLElement)
					.reduce(
						(previous, node) => [...previous, ...getFieldElements(node)],
						[] as FieldElement[]
					);

				addedElements.forEach(register(store));
			}
		});

		observer.observe(node, { childList: true, subtree: true });

		const _handleChange = handleChange(store);

		node.addEventListener('input', _handleChange);
		node.addEventListener('change', _handleChange);
		node.addEventListener('focusout', _handleChange);

		return {
			destroy() {
				observer.disconnect();

				node.removeEventListener('input', _handleChange);
				node.removeEventListener('change', _handleChange);
				node.removeEventListener('focusout', _handleChange);
			}
		};
	};

	return {
		form,
		handleSubmit: handleSubmit(store),
		addField: addField(store),
		removeField: removeField(store),
		setValue: setValue(store),
		values: derived(store, ({ values }) => values),
		formState: derived(store, ({ fields, values, ...rest }) => rest)
	};
};
