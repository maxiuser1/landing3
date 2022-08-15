<script lang="ts">
	import get from '$lib/utils/get';

	import type { FormState } from '$lib/validations/types';

	import type { Readable } from 'svelte/store';

	export let value: string | null | undefined = null;
	export let name: string;
	export let placeholder: string | null | undefined = null;
	export let readonly = false;
	export let tipo: 'text' | 'email' | 'number' | 'password' = 'text';
	export let formState: Readable<
		Pick<FormState<any>, 'errors' | 'touchedFields' | 'dirtyFields' | 'isSubmitted'>
	>;

	$: errors = $formState.errors;
	$: touched = $formState.touchedFields;
	$: dirty = $formState.dirtyFields;

	$: isSubmitted = $formState.isSubmitted;
	$: error = get(errors, name);
	$: isTouched = get(touched, name);
	$: isDirty = get(dirty, name);
</script>

{#if tipo == 'text'}
	<input
		bind:value
		{name}
		type="text"
		{placeholder}
		{readonly}
		on:change
		on:blur
		class:error={(isSubmitted || (isTouched && isDirty)) && error?.message}
	/>
{:else if tipo == 'email'}
	<input
		bind:value
		{name}
		type="email"
		{placeholder}
		{readonly}
		on:change
		on:blur
		class:error={(isSubmitted || (isTouched && isDirty)) && error?.message}
	/>
{:else if tipo == 'password'}
	<input
		bind:value
		{name}
		type="password"
		{placeholder}
		{readonly}
		on:change
		on:blur
		class:error={(isSubmitted || (isTouched && isDirty)) && error?.message}
	/>
{:else if tipo == 'number'}
	<input
		bind:value
		{name}
		type="number"
		{placeholder}
		{readonly}
		on:change
		on:blur
		class:error={(isSubmitted || (isTouched && isDirty)) && error?.message}
	/>
{/if}

<style>
	input[type='number'] {
		-moz-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}

	input {
		width: 100%;
		padding: 6px 12px;
		border: 1px solid #c6c6c6;
		border-radius: 4px;
		background: #ffffff;
		height: 42px;
	}
	input:focus {
		outline: none;
	}

	.error {
		border-color: red;
	}
</style>
