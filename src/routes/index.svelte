<script lang="ts">
	import { Carousel, SearchBox, Sections } from '$lib/components/Home';

	export let eventos: Array<App.Evento>;
</script>

<Carousel {eventos} />
<SearchBox />
<Sections {eventos} />

<style lang="scss">
</style>
