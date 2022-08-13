<script lang="ts">
	import { Header, Footer } from '$lib/components/Layout';
	let categories: Array<string> = [
		'Conciertos',
		'Teatro',
		'Deportes',
		'Festrivales',
		'Arte y Cultura',
		'Niños'
	];
</script>

<Header {categories} />
<main>
	<slot />
</main>
<Footer />

<style lang="scss">
</style>
