import get from '$lib/utils/get';
import set from '$lib/utils/set';
import type { Writable } from 'svelte/store';
import type { FieldValues, FormState } from '../types';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	(name: string, value: unknown) => {
		store.update((current) => {
			const previousValue = get(current.values, name);

			return {
				...current,
				values: set(current.values, name, [...(previousValue || []), value])
			};
		});
	};
