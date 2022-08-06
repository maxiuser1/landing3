<script lang="ts">
	export let lugares;
</script>

<div>
	{#if lugares}
		{#each lugares.values as valor}
			{valor.codigo}
		{/each}
	{/if}
</div>

<style lang="scss">
	div {
		background: gray;
		color: red;
	}
</style>
