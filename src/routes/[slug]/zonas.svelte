<script lang="ts">
	import { goto } from '$app/navigation';

	import { Breadcrumbs, Steps, Secciones } from '$lib/components/Evento';
	import { compraData } from '$lib/stores/compra';
	export let evento: App.Ensallo;

	const zonaClick = (e: CustomEvent) => {
		const zonaSeleccionada: App.Seccion = e.detail.detail;
		compraData.update((current) => ({
			...current,
			zona: {
				tipo: zonaSeleccionada.tipo,
				base: zonaSeleccionada.base,
				numerado: zonaSeleccionada.numerado
			}
		}));

		if (zonaSeleccionada.numerado) {
			goto(`../${evento.general?.slug}/lugar`);
		} else {
			goto(`../${evento.general?.slug}/reserva`);
		}
	};
</script>

<Breadcrumbs {evento} />
<Steps paso={1} />
<Secciones {evento} on:clickeado={zonaClick} />
