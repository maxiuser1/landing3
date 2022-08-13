<script lang="ts">
	import { Breadcrumbs, Steps, Secciones } from '$lib/components/Evento';
	export let evento: App.Ensallo;
</script>

<Breadcrumbs {evento} />
<Steps paso={1} />
<Secciones {evento} />
