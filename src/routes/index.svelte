<script lang="ts">
	import { Carousel, SearchBox, Sections } from '$lib/components/Home';

	export let eventos: Array<App.Evento>;
</script>

<Carousel {eventos} />
<SearchBox />
<Sections {eventos} />
<div class="divider" />

<style lang="scss">
	.divider {
		display: none;
	}
</style>
