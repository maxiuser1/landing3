<script lang="ts">
	import Card from './Card.svelte';

	export let eventos: Array<App.Evento>;
</script>

<div class="cards">
	{#each eventos as evento}
		<Card {evento} />
	{/each}
</div>

<style lang="scss">
	.cards {
		margin-top: 24px;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(342px, 1fr));
		gap: 15px;

		@include breakpoint($md) {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
			margin-top: 36px;

			gap: 24px;
		}
	}
</style>
