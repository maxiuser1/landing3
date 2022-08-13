<script lang="ts">
	import Step from './Step.svelte';
	import { compraData } from '$lib/stores/compra';

	export let paso: number;
</script>

<section class="container wizard">
	<div class="mpasos">
		{#if paso == 1}
			<Step numero="1" titulo="Entrada" subtitulo="Elige el tipo de entrada" seleccionado={true} />
			<Step numero="2" titulo="" subtitulo="" seleccionado={false} />
		{:else if paso == 4}
			<Step numero="3" titulo="Resumen" subtitulo="Lugar reservado" seleccionado={true} />
		{/if}
	</div>

	<div class="pasos">
		<Step
			numero="1"
			titulo="Entrada"
			subtitulo={$compraData.zona?.tipo ?? 'Elige el tipo de entrada'}
			seleccionado={true}
		/>

		<Step numero="2" titulo="Lugar" subtitulo="¿Vas solo o acompañado?" seleccionado={paso >= 2} />

		<Step numero="3" titulo="Resumen" subtitulo="Estas a un paso" seleccionado={paso >= 4} />
	</div>
</section>

<style lang="scss">
	.wizard {
		.mpasos {
			margin: 40px 0px;
			display: flex;
			justify-content: space-between;
			@include breakpoint($md) {
				display: none;
			}
		}

		.pasos {
			margin: 72px 0px;
			display: none;
			width: 100%;
			gap: 24px;
			justify-content: space-between;

			@include breakpoint($md) {
				display: flex;
			}
		}
	}
</style>
