<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let color: string;
	export let disabled: boolean;
	export let width: number;
	// let height: number = width * 0.7;

	const dispatch = createEventDispatcher();
	function handleClick() {
		dispatch('clickeado', {});
	}
</script>

{#if disabled}
	<svg
		{width}
		viewBox="0 0 14 12"
		xmlns="http://www.w3.org/2000/svg"
		stroke="#D4D4D4"
		stroke-width="1"
		fill="none"
	>
		<path
			d="M1 0 3 0A1 1 90 013 2L1 2A1 1 90 011 0ZM6 0 8 0A1 1 90 018 2L6 2A1 1 90 016 0ZM11 0 13 0A1 1 90 0113 2L11 2A1 1 90 0111 0ZM3 3 11 3A1 1 90 0111 9L3 9A1 1 90 013 3ZM1 10 3 10A1 1 90 013 12L1 12A1 1 90 011 10ZM6 10 8 10A1 1 90 018 12L6 12A1 1 90 016 10ZM11 10 13 10A1 1 90 0113 12L11 12A1 1 90 0111 10Z"
		/>
	</svg>
{:else}
	<svg
		on:click={handleClick}
		{width}
		viewBox="0 0 14 12"
		class="box"
		xmlns="http://www.w3.org/2000/svg"
		fill={color}
	>
		<path
			d="M1 0 3 0A1 1 90 013 2L1 2A1 1 90 011 0ZM6 0 8 0A1 1 90 018 2L6 2A1 1 90 016 0ZM11 0 13 0A1 1 90 0113 2L11 2A1 1 90 0111 0ZM3 3 11 3A1 1 90 0111 9L3 9A1 1 90 013 3ZM1 10 3 10A1 1 90 013 12L1 12A1 1 90 011 10ZM6 10 8 10A1 1 90 018 12L6 12A1 1 90 016 10ZM11 10 13 10A1 1 90 0113 12L11 12A1 1 90 0111 10Z"
		/>
	</svg>
{/if}

<style>
	.box:hover {
		fill: #ff5260;
	}
</style>
