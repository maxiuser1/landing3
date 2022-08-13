<script lang="ts">
	import { goto } from '$app/navigation';
	import { MaramaTrujillo } from '$lib/components/Evento';
	import { compraData } from '$lib/stores/compra';

	export let ensallo: App.Ensallo;

	const comprarClick = () => {
		const compra: App.Compra = {
			evento: {
				id: ensallo.id,
				slug: ensallo.general?.slug,
				artista: ensallo.general?.artista
			}
		};
		compraData.set(compra);

		goto(`${ensallo.general?.slug}/zonas`);
	};
</script>

<svelte:head>
	<title>{ensallo.general?.slug}</title>
</svelte:head>

<MaramaTrujillo on:clickeado={comprarClick} />
