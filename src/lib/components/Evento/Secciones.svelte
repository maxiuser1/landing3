<script type="ts">
	import { goto } from '$app/navigation';
	import { Radio } from '$lib/icons';

	import { compraData } from '$lib/stores/compra';
	import dayjs from '$lib/utils/days/day';
	import { append } from 'svelte/internal';
	import { Soles } from '../Shared';
	import { secciones } from './secciones';

	export let evento: App.Ensallo;

	const seleccionar = (ev: CustomEvent<App.Seccion>): void => {
		const zonaSeleccionada: App.Seccion = ev.detail;
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

<section class="container entrada">
	<div class="grid">
		<div class="main">
			<div class="titulos">
				<h2>Entrada</h2>
				<h3>Selecciona en que sector deseas adquirir y luego continua el proceso</h3>
			</div>
			{#if evento.precios}
				<div class="mapa" use:secciones={evento.precios} on:zonned={seleccionar}>
					{@html evento.mapa}
				</div>
			{/if}

			<div class="leyenda">
				<div>
					{#if evento.precios}
						<ul>
							{#each evento.precios as precio, idx}
								<li>
									<Radio color={precio.color ? precio.color : ''} />
									{precio.nombre}
									<Soles number={precio.base} />
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>
		</div>
		<div class="summary">
			<div class="headings">
				<h2>Detalle</h2>
				<h1>{evento.general?.artista}</h1>
				<h3>{evento.general?.nombre}</h3>
			</div>

			<h4>
				{#if evento.fechas}
					{#each evento.fechas as fecha}
						{dayjs(fecha.dia).format('ddd D MMMM')}
					{/each}
				{/if}
			</h4>
			<h5>{evento.ubicacion?.nombre}</h5>
		</div>
	</div>
</section>

<style lang="scss">
	.leyenda {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		padding-right: 0px;
		padding-left: 0px;
		@include breakpoint($md) {
			padding-right: 24px;
			padding-left: 24px;
		}
	}

	.entrada {
		margin-bottom: 50px;

		.mapa {
			width: 100%;

			@include breakpoint($md) {
				margin: 20px 0px;
			}
		}

		.grid {
			display: flex;
			flex-direction: column;
			@include breakpoint($md) {
				flex-direction: row;
			}

			h2 {
				font-weight: 700;
				font-size: 24px;
				line-height: 29px;
				color: #000000;
				margin-bottom: 8px;
			}

			h3 {
				font-weight: 400;
				font-size: 16px;
				line-height: 16px;
				color: #1b1b1b;
			}

			.main {
				padding: 0px;
				flex-grow: 2;

				background-color: white;
				border-radius: 8px;

				.titulos {
					padding: 40px;
					@include breakpoint($md) {
						padding: 0px;
					}
				}

				@include breakpoint($md) {
					padding: 40px;
				}
			}

			.summary {
				flex-grow: 1;
				padding: 40px;
				background-color: white;
				border-radius: 8px;
			}
		}
	}

	.main {
		@include breakpoint($md) {
			max-width: 60%;
		}
	}

	.summary {
		.headings {
			padding-bottom: 16px;
			margin-bottom: 16px;
			border-bottom: 1px solid #e2e2e2;
		}

		h5 {
			font-weight: 400;
			font-size: 14px;
			line-height: 17px;
			color: #1b1b1b;
		}

		h4 {
			font-weight: 500;
			font-size: 16px;
			line-height: 16px;
			color: #1b1b1b;
			margin-bottom: 8px;
		}
		h1 {
			font-weight: 700;
			font-size: 32px;
			line-height: 38px;
			color: #262626;
		}
		h2 {
			font-weight: 700;
			font-size: 24px;
			line-height: 29px;
			color: #000000;
		}

		h3 {
			font-weight: 400;
			font-size: 20px;
			line-height: 24px;
			color: #262626;
		}
	}
</style>
