import { type Writable, get as getFromStore } from 'svelte/store';
import type { FieldValues, FormState, Resolver } from '../types';

export default <TFieldValues extends FieldValues>(store: Writable<FormState<TFieldValues>>) =>
	(resolver: Resolver<TFieldValues>) =>
		resolver(getFromStore(store).values);
