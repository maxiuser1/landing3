<script lang="ts">
	import { slide } from 'svelte/transition';
	import { User } from '$lib/icons';
	import Nav from './Nav.svelte';
	import Logo from './Logo.svelte';
	import Socials from './Socials.svelte';

	export let categories: Array<string>;

	let visible = false;
	const animate = (node: any, args: any) => (args.cond ? slide(node, args) : slide(node, args));

	const toggle = () => {
		visible = !visible;
	};
</script>

<header class="main">
	<nav class="container">
		<Socials on:togglemenu={toggle} closable={visible} />
		<Logo />
		<Nav on:togglemenu={toggle} closable={visible} />
	</nav>
</header>

{#if visible}
	<header class="categories" transition:animate>
		<nav class="container">
			<ul class="ingresa">
				<li>
					<User /> <a class="anchormenu" href="../login"> Ingresa</a>
				</li>
			</ul>
			<ul class="menu">
				{#each categories as category}
					<li>{category}</li>
				{/each}
			</ul>
		</nav>
	</header>
{/if}

<style lang="scss">
	.anchormenu {
		color: #fff;
	}

	.main {
		width: 100%;
		position: fixed;
		z-index: 2;
		top: 0;
		left: 0;
		background: linear-gradient(270deg, var(--red) 0%, var(--pink) 100%);

		nav {
			margin: 0 auto;
			height: var(--header-height);
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	.categories {
		width: 304px;
		position: fixed;
		height: 100vh;
		z-index: 2;
		top: var(--header-height);
		left: 0;
		background-color: #5b025a;

		@include breakpoint($md) {
			width: 100%;
			height: initial;
		}

		nav {
			margin: 0 auto;
			padding-left: 24px;

			@include breakpoint($md) {
				padding-left: initial;
				height: 50px;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			ul.ingresa {
				margin-top: 35px;
				padding-bottom: 35px;
				border-bottom: 1px solid #80057f;
				li {
					color: white;
					font-weight: 500;
					display: flex;
					align-items: center;
					font-size: 14px;
					line-height: 18px;
					gap: 10px;
				}
				@include breakpoint($md) {
					display: none !important;
				}
			}
			ul.menu {
				margin-top: 32px;
				display: flex;
				flex-direction: column;
				gap: 32px;

				@include breakpoint($md) {
					margin-top: initial;
					flex-direction: row;
				}

				li {
					color: white;
					font-weight: 500;
					font-size: 14px;
					line-height: 18px;
				}
			}
		}
	}
</style>
