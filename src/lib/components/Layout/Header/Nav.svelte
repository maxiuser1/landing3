<script lang="ts">
	import { Close, Menu, User } from '$lib/icons';
	import { createEventDispatcher } from 'svelte';
	export let closable = false;
	const dispatch = createEventDispatcher();
	const toggleMenu = () => dispatch('togglemenu');
</script>

<ul class="socials">
	<li class="item">
		<a class="ingresa" href="../login">
			<User />
			Ingresa
		</a>
	</li>
	<li class="last" on:click={toggleMenu}>
		{#if closable}
			<Close />
		{:else}
			<Menu lefted={false} />
		{/if}
	</li>
</ul>

<style lang="scss">
	.ingresa {
		color: white;
	}
	.socials {
		display: flex;
		align-items: center;
		gap: 24px;
		color: white;
	}

	.item {
		display: none;
		@include breakpoint($md) {
			display: flex;
			align-items: center;
		}
	}

	.last {
		display: none;
		@include breakpoint($md) {
			display: initial;
			cursor: pointer;
			border-left: 2px solid #ff888f;
			padding-left: 24px;
		}
	}
</style>
