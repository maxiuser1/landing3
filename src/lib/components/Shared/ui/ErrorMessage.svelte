<script lang="ts">
	import get from '$lib/utils/get';
	import type { FormState } from '$lib/validations/types';
	import type { Readable } from 'svelte/store';

	export let formState: Readable<
		Pick<FormState<any>, 'errors' | 'touchedFields' | 'dirtyFields' | 'isSubmitted'>
	>;
	export let name: string;

	$: errors = $formState.errors;
	$: touched = $formState.touchedFields;
	$: dirty = $formState.dirtyFields;

	$: isSubmitted = $formState.isSubmitted;
	$: error = get(errors, name);
	$: isTouched = get(touched, name);
	$: isDirty = get(dirty, name);
</script>

{#if (isSubmitted || (isTouched && isDirty)) && error?.message}
	<span class="error">
		{error.message}
	</span>
{/if}

<style>
	.error {
		margin-top: 4px;
		color: #ff0036;
	}
</style>
