<script context="module">
	let ssr = false;
</script>

<script lang="ts">
	export let number;

	let formatted = new Intl.NumberFormat('es-PE', {
		style: 'decimal',
		minimumFractionDigits: 2
	}).format(number);
</script>

<span>S/ {formatted}</span>
