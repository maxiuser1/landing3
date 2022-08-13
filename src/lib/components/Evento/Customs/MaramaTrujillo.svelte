<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const comprarClick = () => {
		dispatch('clickeado', {});
	};
</script>

<div class="main">
	<div class="container">
		<img
			src="https://res.cloudinary.com/maxitech/image/upload/v1659977847/ticketera/banners/TICKETERA_LISTADE_PRECIOS-MAPA_c7xvcf.jpg"
			alt="portada"
		/>
	</div>
	<section class="container cta">
		<button on:click|once={comprarClick} class="btn comprar">Ir a comprar </button>
	</section>
</div>

<style lang="scss">
	.main {
		background-color: #332218;

		.cta {
			margin-top: 20px;
			text-align: center;

			.btn {
				min-width: 80%;
			}
		}
		padding-bottom: 150px;
	}
</style>
