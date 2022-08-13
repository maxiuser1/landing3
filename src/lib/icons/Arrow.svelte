<script>
	export let color = 'white';
	export let left = false;
</script>

{#if !left}
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M6.99967 0.333435L5.82468 1.50844L10.4747 6.16677H0.333008V7.83344H10.4747L5.82468 12.4918L6.99967 13.6668L13.6663 7.0001L6.99967 0.333435Z"
			fill={color}
		/>
	</svg>
{:else}
	<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M6.9999 13.667L8.1749 12.492L3.5249 7.83366L13.6666 7.83366L13.6666 6.16699L3.5249 6.16699L8.1749 1.50866L6.9999 0.333658L0.333232 7.00032L6.9999 13.667Z"
			fill={color}
		/>
	</svg>
{/if}
