<script lang="ts">
	import { goto } from '$app/navigation';

	import { onMount } from 'svelte';

	export let eventos: Array<App.Evento>;

	let cantidad = 0;
	let ancho = 0;
	let mini = 0;
	let translate = 0;
	let selectedidx = 0;

	const handleClick = (idx: number) => {
		selectedidx = idx;
		translate = idx * (mini * -1);
	};

	onMount(async () => {
		cantidad = eventos.length;
		ancho = 100 * cantidad;
		mini = 100 / cantidad;
		translate = 0;
		selectedidx = 0;
		start();
	});

	const start = () => {
		let current = 0;
		return new Promise((resolve) => {
			setIntervalImmediate(() => {
				handleClick(current);
				current++;
				if (current == eventos.length) {
					current = 0;
				}
			}, 3000);
		});
	};

	const setIntervalImmediate = (fn: Function, ms: number) => {
		fn();
		return setInterval(fn, ms);
	};

	const redirigir = (slug: string) => {
		goto(`/${slug}`);
	};
</script>

<section class="carousel" aria-label="carousel">
	<div class="grande" style:width="{ancho}%" style:transform="translateX({translate}%)">
		{#each eventos as evento}
			<div
				class="slide"
				on:click={() => redirigir(evento.slug)}
				style="background-image: url('{evento.banner}');width: {mini}%;"
			/>
		{/each}
	</div>
	<div class="botonera">
		<ul class="puntos">
			{#each eventos as item, idx}
				<li class="punto" on:click={() => handleClick(idx)} class:selected={selectedidx === idx} />
			{/each}
		</ul>
	</div>
</section>

<style lang="scss">
	.carousel {
		width: 100%;
		overflow: hidden;
		position: relative;

		.grande {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			transition: all 0.5s ease;
		}

		.slide {
			color: yellow;
			cursor: pointer;
			font-size: 20px;
			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center center;
			height: 149px;

			@include breakpoint($sm) {
				height: 318px;
			}

			@include breakpoint($md) {
				height: 440px;
			}
		}

		.botonera {
			width: 100%;
			position: absolute;
			bottom: 0px;
			display: none;
			@include breakpoint($md) {
				display: flex;
				justify-content: center;
			}
		}

		.puntos {
			display: flex;
			gap: 8px;
			flex-flow: row nowrap;
		}

		.punto {
			width: 12px;
			cursor: pointer;
			height: 12px;
			background-color: white;
			border: 1px solid #a809a6;
			margin-bottom: 52px;
			border-radius: 50%;
		}

		.selected {
			width: 32px;
			background: #d30ed1;
			border: 1px solid #ffffff;
			border-radius: 8px;
		}
	}
</style>
