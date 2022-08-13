<script type="ts">
	export let numero: string;
	export let titulo: string;
	export let subtitulo: string;
	export let seleccionado: boolean = false;
</script>

<div class="paso" class:seleccionado>
	<div class="numero">{numero}</div>
	<div>
		<h1>{titulo}</h1>
		<h2>{subtitulo}</h2>
	</div>
</div>

<style lang="scss">
	.paso {
		display: flex;
		align-items: center;
		gap: 8px;

		.numero {
			color: white;
			display: flex;
			width: 54px;
			height: 54px;
			font-weight: 900;
			font-size: 24px;
			line-height: 29px;
			align-items: center;
			justify-content: center;
			width: 54px;
			border-radius: 50%;
			background-color: #e2e2e2;
		}

		h1 {
			font-weight: 900;
			font-size: 18px;
			line-height: 22px;
			color: #c6c6c6;
		}

		h2 {
			font-weight: 400;
			font-size: 14px;
			line-height: 17px;
			color: #c6c6c6;
		}
	}
	.seleccionado {
		.numero {
			background-color: #d30ed1;
		}

		h1 {
			color: #d30ed1;
		}

		h2 {
			color: #262626;
		}
	}
</style>
